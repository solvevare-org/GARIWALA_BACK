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

// Health check
app.get('/api/health', (_, res) => res.json({ status: 'ok' }))

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
