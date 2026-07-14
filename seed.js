require('dotenv').config()
const mongoose = require('mongoose')
const Product  = require('./models/Product')

const alto = {
  id: 'toyota-alto-660cc',
  name: 'Toyota Alto 660cc',
  model: 'HA36S-DCBF',
  category: 'Hatchback',
  type: 'Hatchback',
  inStock: true,
  image: '/gallery/alto.png',
  overview: "The Toyota Alto 660cc is Pakistan's most fuel-efficient and affordable hatchback. Powered by a 660cc 3-cylinder engine, it delivers exceptional mileage of up to 26 km/l making it the ideal choice for city commuting and first-time car buyers.",
  specs: ['Engine: 660cc 3-cyl', 'Power: 38 HP', 'Transmission: 5-speed Manual', 'Mileage: 26 km/l'],
  specGroups: [
    {
      label: 'Engine',
      items: [
        { label: 'Type',                value: '660cc 3-cylinder DOHC' },
        { label: 'Displacement (cc)',   value: '658' },
        { label: 'Max Power (hp/rpm)',  value: '38 / 6,000' },
        { label: 'Max Torque (N.m/rpm)',value: '57 / 4,000' },
        { label: 'Fuel System',         value: 'Multi-point injection' },
      ],
    },
    {
      label: 'Transmission',
      items: [
        { label: 'Type',  value: '5-speed Manual' },
        { label: 'Drive', value: 'Front Wheel Drive (FWD)' },
      ],
    },
    {
      label: 'Suspension',
      items: [
        { label: 'Front', value: 'MacPherson strut' },
        { label: 'Rear',  value: 'Torsion beam' },
      ],
    },
    {
      label: 'Brakes',
      items: [
        { label: 'Front', value: 'Ventilated disc' },
        { label: 'Rear',  value: 'Drum' },
      ],
    },
    {
      label: 'Tyres',
      items: [{ label: 'Size', value: '155/65R13' }],
    },
    {
      label: 'Dimensions',
      items: [
        { label: 'Overall Length (mm)',    value: '3,395' },
        { label: 'Overall Width (mm)',     value: '1,475' },
        { label: 'Wheelbase (mm)',         value: '2,280' },
        { label: 'Ground Clearance (mm)', value: '160' },
      ],
    },
    {
      label: 'Capacity',
      items: [
        { label: 'Seating',          value: '4 persons' },
        { label: 'Boot Capacity (L)', value: '177' },
        { label: 'Fuel Tank (L)',     value: '27' },
      ],
    },
    {
      label: 'Performance',
      items: [
        { label: 'Fuel Economy (km/l)', value: '26' },
        { label: '0-100 km/h (sec)',    value: '14.5' },
        { label: 'Top Speed (km/h)',    value: '130' },
      ],
    },
    {
      label: 'Warranty',
      items: [{ label: 'Coverage', value: '3 years / 100,000 km' }],
    },
  ],
  images: [
    '/gallery/alto.png',
    'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=1200&q=80&fit=crop',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=80&fit=crop',
  ],
}

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteOne({ id: alto.id })
    const p = await Product.create(alto)
    console.log('✓ Inserted:', p.name, '| Category:', p.category, '| Images:', p.images.length)
    await mongoose.disconnect()
  })
  .catch((e) => {
    console.error('✗ Error:', e.message)
    process.exit(1)
  })
