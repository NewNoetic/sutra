const cors = require('../_utils/cors')() // default config
const extractor = require('unfluff');

const handler = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.status(200).send()
    return
  }
  
  if (!req.body || !req.body.html) {
    console.log(`ip address: ${req.headers['x-forwarded-for']}`)
    res.status(400).send('Request must include a JSON body with `html` key')
    return
  }

  console.log(req.body.html)
  const data = extractor.lazy(req.body.html, 'en')
  res.json({text: data.text()})
}

module.exports = cors(handler)