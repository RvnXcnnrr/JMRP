const fs = require('node:fs')
const crypto = require('node:crypto')

const html = fs.readFileSync('index.html', 'utf8')
const match = html.match(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/)

if (!match) {
  console.error('JSON-LD script not found in index.html')
  process.exit(1)
}

const content = match[1]
const hash = crypto.createHash('sha256').update(content, 'utf8').digest('base64')
console.log(`sha256-${hash}`)
