import { getStore } from '@netlify/blobs'

function json(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}

export default async (req, context) => {
  if (req.method !== 'GET') return json(405, { ok: false, error: 'Method not allowed' })

  const store = getStore({ name: 'testimonials', consistency: 'eventual' })
  const approved = (await store.get('approved', { type: 'json' })) || []

  return json(200, { ok: true, testimonials: Array.isArray(approved) ? approved : [] })
}
