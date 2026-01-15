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
  const action = payload && typeof payload.action === 'string' ? payload.action : ''

  if (!id) return json(400, { ok: false, error: 'Missing id' })
  if (action !== 'approve' && action !== 'decline') return json(400, { ok: false, error: 'Invalid action' })

  const store = getStore({ name: 'testimonials', consistency: 'strong' })

  const pending = (await store.get('pending', { type: 'json' })) || []
  if (!Array.isArray(pending)) return json(500, { ok: false, error: 'Storage corrupted (pending)' })

  const idx = pending.findIndex((t) => t && typeof t === 'object' && t.id === id)
  if (idx === -1) return json(404, { ok: false, error: 'Not found' })

  const [item] = pending.splice(idx, 1)
  await store.setJSON('pending', pending)

  if (action === 'approve') {
    const approved = (await store.get('approved', { type: 'json' })) || []
    const list = Array.isArray(approved) ? approved : []

    list.unshift({
      id: item.id,
      name: item.name,
      role: item.role,
      company: item.company,
      project: item.project,
      message: item.message,
      createdAt: item.createdAt,
      approvedAt: new Date().toISOString(),
    })

    if (list.length > 100) list.length = 100
    await store.setJSON('approved', list)
  }

  return json(200, { ok: true })
}
