const router = require('express').Router()
const multer = require('multer')
const path   = require('path')
const auth   = require('../middleware/auth')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename:    (req, file, cb) => {
    const ext  = path.extname(file.originalname)
    const name = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`
    cb(null, name)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Only image files allowed'))
  },
})

router.post('/', auth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' })
  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
  res.json({ url })
})

router.post('/multiple', auth, upload.array('images', 20), (req, res) => {
  if (!req.files?.length) return res.status(400).json({ message: 'No files uploaded' })
  const urls = req.files.map((f) => `${req.protocol}://${req.get('host')}/uploads/${f.filename}`)
  res.json({ urls })
})

module.exports = router
