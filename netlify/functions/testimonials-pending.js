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
  if (req.method !== 'GET') return json(405, { ok: false, error: 'Method not allowed' })

  const expected = process.env.TESTIMONIALS_ADMIN_TOKEN
  if (!expected) return json(500, { ok: false, error: 'Missing TESTIMONIALS_ADMIN_TOKEN' })

  const token = getToken(req)
  if (!token || token !== expected) return json(401, { ok: false, error: 'Unauthorized' })

  const store = getStore({ name: 'testimonials', consistency: 'strong' })
  const pending = (await store.get('pending', { type: 'json' })) || []

  return json(200, { ok: true, pending: Array.isArray(pending) ? pending : [] })
}
