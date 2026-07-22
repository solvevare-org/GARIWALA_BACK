require('dotenv').config()
const express  = require('express')
const mongoose = require('mongoose')
const cors     = require('cors')

const app = express()
const corsOrigin = process.env.CORS_ORIGIN

app.use(cors({ origin: corsOrigin, credentials: true }))
app.use(express.json())
app.use('/uploads', require('express').static(require('path').join(__dirname, 'uploads')))

// Routes
app.use('/api/auth',     require('./routes/auth'))
app.use('/api/products', require('./routes/products'))
app.use('/api/upload',   require('./routes/upload'))
app.use('/api/contact',  require('./routes/contact'))
app.use('/api/feedback', require('./routes/feedback'))

// Health check
app.get('/api/health', (_, res) => res.json({ status: 'ok' }))

// Image proxy — fetches external images server-side to bypass browser CORS
app.get('/api/proxy-image', async (req, res) => {
  const url = req.query.url
  if (!url) return res.status(400).json({ message: 'url param required' })
  try {
    const fetch = (await import('node-fetch')).default
    const response = await fetch(url)
    if (!response.ok) return res.status(502).json({ message: 'Failed to fetch image' })
    const contentType = response.headers.get('content-type') || 'image/jpeg'
    res.set('Content-Type', contentType)
    res.set('Cache-Control', 'public, max-age=86400')
    response.body.pipe(res)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    const port = process.env.PORT || 5000
    app.listen(port, () => {
      console.log(`Backend URL is http://localhost:${port}`)
      if (process.env.CORS_ORIGIN) {
        console.log(`Frontend URL is ${process.env.CORS_ORIGIN}`)
      }
    })
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  })
