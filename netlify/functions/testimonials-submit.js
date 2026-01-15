import { getStore } from '@netlify/blobs'

function json(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}

function badRequest(message) {
  return json(400, { ok: false, error: message })
}

function getClientIP(req) {
  return req.headers.get('x-nf-client-connection-ip') || req.headers.get('x-forwarded-for') || ''
}

async function parseBody(req) {
  const contentType = req.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') return null
    return body
  }

  if (contentType.includes('application/x-www-form-urlencoded')) {
    const text = await req.text()
    const params = new URLSearchParams(text)
    return Object.fromEntries(params.entries())
  }

  // Fallback: try formData (covers multipart/form-data)
  try {
    const form = await req.formData()
    const obj = {}
    for (const [k, v] of form.entries()) {
      if (typeof v === 'string') obj[k] = v
    }
    return obj
  } catch {
    return null
  }
}

export default async (req, context) => {
  if (req.method !== 'POST') return json(405, { ok: false, error: 'Method not allowed' })

  const body = await parseBody(req)
  if (!body) return badRequest('Invalid request body')

  // Honeypot support
  if (String(body['bot-field'] || '').trim()) return json(200, { ok: true })

  const name = String(body.name || '').trim()
  const message = String(body.message || '').trim()

  if (!name) return badRequest('Name is required')
  if (!message) return badRequest('Testimonial is required')
  if (message.length > 1200) return badRequest('Testimonial is too long')

  const entry = {
    id: crypto.randomUUID(),
    name,
    email: body.email ? String(body.email).trim() : undefined,
    role: body.role ? String(body.role).trim() : undefined,
    company: body.company ? String(body.company).trim() : undefined,
    project: body.project ? String(body.project).trim() : undefined,
    message,
    createdAt: new Date().toISOString(),
    ip: getClientIP(req),
    userAgent: req.headers.get('user-agent') || undefined,
  }

  const store = getStore({ name: 'testimonials', consistency: 'strong' })

  const pending = (await store.get('pending', { type: 'json' })) || []
  if (!Array.isArray(pending)) return json(500, { ok: false, error: 'Storage corrupted (pending)' })

  pending.unshift(entry)
  // Keep pending list bounded
  if (pending.length > 200) pending.length = 200

  await store.setJSON('pending', pending)

  return json(200, { ok: true, id: entry.id })
}
