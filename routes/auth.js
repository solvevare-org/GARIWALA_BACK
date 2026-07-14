const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt    = require('jsonwebtoken')

// Single admin — credentials from .env
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (email !== process.env.ADMIN_EMAIL)
    return res.status(401).json({ message: 'Invalid credentials' })

  const valid = await bcrypt.compare(password, await bcrypt.hash(process.env.ADMIN_PASSWORD, 10))
  // Direct compare for static admin
  if (password !== process.env.ADMIN_PASSWORD)
    return res.status(401).json({ message: 'Invalid credentials' })

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '8h' })
  res.json({ token })
})

module.exports = router
