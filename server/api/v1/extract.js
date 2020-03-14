const extractor = require('unfluff');

const handler = async (req, res) => {
    if (!req.body || !req.body.html) {
      console.log(`ip address: ${req.headers['x-forwarded-for']}`)
      res.status('400').send('Request must include a JSON body with `html` key')
      return
    }

    const data = extractor.lazy(req.body.html)
    res.send(data.text())
}