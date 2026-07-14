const router  = require('express').Router()
const Product = require('../models/Product')
const auth    = require('../middleware/auth')

const slugify = (value = '') =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

const findProductByIdOrSlug = async (identifier) => {
  const exact = await Product.findOne({ id: identifier })
  if (exact) return exact

  const normalized = slugify(identifier)
  if (!normalized) return null

  const products = await Product.find()
  return products.find((product) =>
    slugify(product.id) === normalized || slugify(product.name) === normalized
  ) || null
}

// GET all products — public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 })
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET single product — public
router.get('/:id', async (req, res) => {
  try {
    const product = await findProductByIdOrSlug(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST create product — protected
router.post('/', auth, async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// PUT update product — protected
router.put('/:id', auth, async (req, res) => {
  try {
    const existing = await findProductByIdOrSlug(req.params.id)
    if (!existing) return res.status(404).json({ message: 'Product not found' })

    const product = await Product.findByIdAndUpdate(
      existing._id,
      req.body,
      { returnDocument: 'after', runValidators: true }
    )
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// DELETE product — protected
router.delete('/:id', auth, async (req, res) => {
  try {
    const existing = await findProductByIdOrSlug(req.params.id)
    if (!existing) return res.status(404).json({ message: 'Product not found' })

    await Product.findByIdAndDelete(existing._id)
    res.json({ message: 'Product deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
