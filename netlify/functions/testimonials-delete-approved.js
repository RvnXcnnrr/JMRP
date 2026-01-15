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

function getToken(req) {
  const raw = req.headers.get('authorization') || ''
  if (raw.toLowerCase().startsWith('bearer ')) return raw.slice(7).trim()
  return (req.headers.get('x-admin-token') || '').trim()
}

export default async (req, context) => {
  if (req.method !== 'POST') return json(405, { ok: false, error: 'Method not allowed' })

  const expected = process.env.TESTIMONIALS_ADMIN_TOKEN
  if (!expected) return json(500, { ok: false, error: 'Missing TESTIMONIALS_ADMIN_TOKEN' })

  const token = getToken(req)
  if (!token || token !== expected) return json(401, { ok: false, error: 'Unauthorized' })

  const payload = await req.json().catch(() => null)
  const id = payload && typeof payload.id === 'string' ? payload.id : ''
  if (!id) return json(400, { ok: false, error: 'Missing id' })

  const store = getStore({ name: 'testimonials', consistency: 'strong' })
  const approved = (await store.get('approved', { type: 'json' })) || []
  const list = Array.isArray(approved) ? approved : []

  const idx = list.findIndex((t) => t && typeof t === 'object' && t.id === id)
  if (idx === -1) return json(404, { ok: false, error: 'Not found' })

  list.splice(idx, 1)
  await store.setJSON('approved', list)

  return json(200, { ok: true })
}
