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
  const nf = req.headers.get('x-nf-client-connection-ip')
  if (nf) return nf

  const forwarded = req.headers.get('x-forwarded-for') || ''
  // x-forwarded-for may contain a list. Take the first value.
  const first = forwarded.split(',')[0]?.trim()
  return first || ''
}

function clamp(s, maxLen) {
  const text = String(s || '').trim()
  if (!text) return ''
  return text.length > maxLen ? text.slice(0, maxLen) : text
}

function isValidEmail(email) {
  // Simple sanity check. We don't need full RFC parsing.
  const e = String(email || '').trim()
  if (!e) return true
  if (e.length > 120) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
}

async function enforceRateLimit(store, ip) {
  if (!ip) return

  const key = `ratelimit/${ip}`
  const now = Date.now()
  const windowMs = 60 * 60 * 1000
  const maxPerWindow = 5

  const cur = (await store.get(key, { type: 'json' })) || null
  const state = cur && typeof cur === 'object' ? cur : { count: 0, resetAt: now + windowMs }

  const resetAt = typeof state.resetAt === 'number' ? state.resetAt : now + windowMs
  if (now > resetAt) {
    state.count = 0
    state.resetAt = now + windowMs
  }

  const count = typeof state.count === 'number' ? state.count : 0
  if (count >= maxPerWindow) {
    throw new Error('Too many submissions. Please try again later.')
  }

  state.count = count + 1
  await store.setJSON(key, state)
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

  const name = clamp(body.name, 80)
  const email = clamp(body.email, 120)
  const role = clamp(body.role, 80)
  const company = clamp(body.company, 80)
  const project = clamp(body.project, 80)
  const message = clamp(body.message, 1200)

  if (!name) return badRequest('Name is required')
  if (!message) return badRequest('Testimonial is required')
  if (!isValidEmail(email)) return badRequest('Invalid email')

  const entry = {
    id: crypto.randomUUID(),
    name,
    email: email || undefined,
    role: role || undefined,
    company: company || undefined,
    project: project || undefined,
    message,
    createdAt: new Date().toISOString(),
  }

  const store = getStore({ name: 'testimonials', consistency: 'strong' })

  try {
    await enforceRateLimit(store, getClientIP(req))
  } catch (err) {
    return badRequest(err instanceof Error ? err.message : 'Rate limited')
  }

  const pending = (await store.get('pending', { type: 'json' })) || []
  if (!Array.isArray(pending)) return json(500, { ok: false, error: 'Storage corrupted (pending)' })

  pending.unshift(entry)
  // Keep pending list bounded
  if (pending.length > 200) pending.length = 200

  await store.setJSON('pending', pending)

  return json(200, { ok: true, id: entry.id })
}
