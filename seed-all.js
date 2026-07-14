const mongoose = require('mongoose')
const Product = require('./models/Product')
require('dotenv').config()

const products = [
  {
    id: 'toyota-corolla',
    name: 'Toyota Corolla',
    model: 'ZRE172-AEXNKW',
    category: 'Cars',
    type: 'Sedan',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=900&q=80&fit=crop',
    overview: "The Toyota Corolla is the world's best-selling car, trusted by millions for its legendary reliability, fuel efficiency, and low cost of ownership.",
    specs: ['Engine: 1.8L VVT-i', 'Power: 140 HP', 'Transmission: CVT', 'Drive: FWD'],
    specGroups: [
      { label: 'Engine', items: [{ label: 'Type', value: '1.8L 4-cylinder VVT-i Petrol' }, { label: 'Displacement (cc)', value: '1,798' }, { label: 'Max Power (hp/rpm)', value: '140 / 6,400' }, { label: 'Max Torque (N.m/rpm)', value: '173 / 4,000' }] },
      { label: 'Transmission', items: [{ label: 'Type', value: 'CVT Automatic' }, { label: 'Drive', value: 'Front Wheel Drive (FWD)' }] },
      { label: 'Dimensions', items: [{ label: 'Overall Length (mm)', value: '4,620' }, { label: 'Overall Width (mm)', value: '1,775' }, { label: 'Wheelbase (mm)', value: '2,700' }] },
      { label: 'Capacity', items: [{ label: 'Seating', value: '5 persons' }, { label: 'Boot Capacity (L)', value: '470' }, { label: 'Fuel Tank (L)', value: '50' }] },
      { label: 'Performance', items: [{ label: 'Fuel Economy (km/l)', value: '15' }, { label: '0–100 km/h (sec)', value: '9.2' }] },
    ],
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=80&fit=crop',
    ],
  },
  {
    id: 'honda-civic',
    name: 'Honda Civic',
    model: 'FC1-GNKH',
    category: 'Cars',
    type: 'Sedan',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=900&q=80&fit=crop',
    overview: 'The Honda Civic combines sporty styling with turbocharged performance and advanced driver assistance technology.',
    specs: ['Engine: 1.5L VTEC Turbo', 'Power: 174 HP', 'Transmission: CVT', 'Drive: FWD'],
    specGroups: [
      { label: 'Engine', items: [{ label: 'Type', value: '1.5L 4-cylinder VTEC Turbo' }, { label: 'Displacement (cc)', value: '1,498' }, { label: 'Max Power (hp/rpm)', value: '174 / 5,500' }, { label: 'Max Torque (N.m/rpm)', value: '220 / 1,700–5,500' }] },
      { label: 'Transmission', items: [{ label: 'Type', value: 'CVT Automatic' }, { label: 'Drive', value: 'Front Wheel Drive (FWD)' }] },
      { label: 'Dimensions', items: [{ label: 'Overall Length (mm)', value: '4,674' }, { label: 'Overall Width (mm)', value: '1,802' }, { label: 'Wheelbase (mm)', value: '2,735' }] },
      { label: 'Capacity', items: [{ label: 'Seating', value: '5 persons' }, { label: 'Boot Capacity (L)', value: '519' }, { label: 'Fuel Tank (L)', value: '47' }] },
      { label: 'Performance', items: [{ label: 'Fuel Economy (km/l)', value: '14' }, { label: '0–100 km/h (sec)', value: '7.8' }] },
    ],
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80&fit=crop',
    ],
  },
  {
    id: 'bmw-3-series',
    name: 'BMW 3 Series',
    model: 'G20-330i',
    category: 'Cars',
    type: 'Executive Sedan',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=80&fit=crop',
    overview: 'The BMW 3 Series defines the executive sports sedan segment with its perfect 50:50 weight distribution and TwinPower Turbo engine.',
    specs: ['Engine: 2.0L TwinPower Turbo', 'Power: 255 HP', 'Transmission: 8-speed Steptronic', 'Drive: RWD'],
    specGroups: [
      { label: 'Engine', items: [{ label: 'Type', value: '2.0L 4-cylinder TwinPower Turbo' }, { label: 'Displacement (cc)', value: '1,998' }, { label: 'Max Power (hp/rpm)', value: '255 / 5,000' }, { label: 'Max Torque (N.m/rpm)', value: '400 / 1,550–4,400' }] },
      { label: 'Transmission', items: [{ label: 'Type', value: '8-speed Steptronic Automatic' }, { label: 'Drive', value: 'Rear Wheel Drive (RWD)' }] },
      { label: 'Dimensions', items: [{ label: 'Overall Length (mm)', value: '4,709' }, { label: 'Overall Width (mm)', value: '1,827' }, { label: 'Wheelbase (mm)', value: '2,851' }] },
      { label: 'Capacity', items: [{ label: 'Seating', value: '5 persons' }, { label: 'Boot Capacity (L)', value: '480' }, { label: 'Fuel Tank (L)', value: '59' }] },
      { label: 'Performance', items: [{ label: 'Fuel Economy (km/l)', value: '13' }, { label: '0–100 km/h (sec)', value: '5.8' }] },
    ],
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1617531653332-bd46c16f4d68?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=80&fit=crop',
    ],
  },
  {
    id: 'mercedes-c-class',
    name: 'Mercedes-Benz C-Class',
    model: 'W206-C200',
    category: 'Cars',
    type: 'Luxury Sedan',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=900&q=80&fit=crop',
    overview: 'The Mercedes-Benz C-Class sets the benchmark for luxury sedans with its opulent MBUX infotainment system and handcrafted interior.',
    specs: ['Engine: 2.0L EQ Boost', 'Power: 204 HP', 'Transmission: 9G-Tronic', 'Drive: RWD'],
    specGroups: [
      { label: 'Engine', items: [{ label: 'Type', value: '2.0L 4-cylinder EQ Boost Petrol' }, { label: 'Displacement (cc)', value: '1,999' }, { label: 'Max Power (hp/rpm)', value: '204 / 5,800' }, { label: 'Max Torque (N.m/rpm)', value: '300 / 1,800–4,000' }] },
      { label: 'Transmission', items: [{ label: 'Type', value: '9G-Tronic 9-speed Automatic' }, { label: 'Drive', value: 'Rear Wheel Drive (RWD)' }] },
      { label: 'Dimensions', items: [{ label: 'Overall Length (mm)', value: '4,751' }, { label: 'Overall Width (mm)', value: '1,820' }, { label: 'Wheelbase (mm)', value: '2,865' }] },
      { label: 'Capacity', items: [{ label: 'Seating', value: '5 persons' }, { label: 'Boot Capacity (L)', value: '455' }, { label: 'Fuel Tank (L)', value: '66' }] },
      { label: 'Performance', items: [{ label: 'Fuel Economy (km/l)', value: '14' }, { label: '0–100 km/h (sec)', value: '7.3' }] },
    ],
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1617531653332-bd46c16f4d68?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1200&q=80&fit=crop',
    ],
  },
  {
    id: 'audi-a4',
    name: 'Audi A4',
    model: 'B9-40TFSI',
    category: 'Cars',
    type: 'Premium Sedan',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=900&q=80&fit=crop',
    overview: "The Audi A4 combines Quattro all-wheel drive with a refined 2.0 TFSI engine and Audi's signature Virtual Cockpit.",
    specs: ['Engine: 2.0L TFSI', 'Power: 190 HP', 'Transmission: 7-speed S tronic', 'Drive: Quattro AWD'],
    specGroups: [
      { label: 'Engine', items: [{ label: 'Type', value: '2.0L 4-cylinder TFSI Petrol' }, { label: 'Displacement (cc)', value: '1,984' }, { label: 'Max Power (hp/rpm)', value: '190 / 4,200' }, { label: 'Max Torque (N.m/rpm)', value: '320 / 1,450–4,200' }] },
      { label: 'Transmission', items: [{ label: 'Type', value: '7-speed S tronic Dual-Clutch' }, { label: 'Drive', value: 'Quattro All-Wheel Drive' }] },
      { label: 'Dimensions', items: [{ label: 'Overall Length (mm)', value: '4,762' }, { label: 'Overall Width (mm)', value: '1,842' }, { label: 'Wheelbase (mm)', value: '2,820' }] },
      { label: 'Capacity', items: [{ label: 'Seating', value: '5 persons' }, { label: 'Boot Capacity (L)', value: '480' }, { label: 'Fuel Tank (L)', value: '58' }] },
      { label: 'Performance', items: [{ label: 'Fuel Economy (km/l)', value: '13' }, { label: '0–100 km/h (sec)', value: '7.1' }] },
    ],
    images: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1617531653332-bd46c16f4d68?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=80&fit=crop',
    ],
  },
  {
    id: 'toyota-alto-660cc',
    name: 'Toyota Alto 660cc',
    model: 'HA36S-GBXEF',
    category: 'Hatchback',
    type: 'Hatchback',
    inStock: true,
    image: '/gallery/alto.png',
    overview: 'The Toyota Alto 660cc is Pakistan\'s most fuel-efficient city car, perfect for urban commuting with its lightweight body and peppy 660cc engine.',
    specs: ['Engine: 660cc 3-cylinder', 'Power: 38 HP', 'Transmission: 5-speed Manual / AGS', 'Drive: FWD'],
    specGroups: [
      { label: 'Engine', items: [{ label: 'Type', value: '660cc 3-cylinder Petrol' }, { label: 'Displacement (cc)', value: '658' }, { label: 'Max Power (hp/rpm)', value: '38 / 6,000' }, { label: 'Max Torque (N.m/rpm)', value: '57 / 3,500' }] },
      { label: 'Transmission', items: [{ label: 'Type', value: '5-speed Manual / AGS Auto' }, { label: 'Drive', value: 'Front Wheel Drive (FWD)' }] },
      { label: 'Dimensions', items: [{ label: 'Overall Length (mm)', value: '3,395' }, { label: 'Overall Width (mm)', value: '1,475' }, { label: 'Wheelbase (mm)', value: '2,360' }] },
      { label: 'Capacity', items: [{ label: 'Seating', value: '4 persons' }, { label: 'Boot Capacity (L)', value: '177' }, { label: 'Fuel Tank (L)', value: '27' }] },
      { label: 'Performance', items: [{ label: 'Fuel Economy (km/l)', value: '24' }, { label: '0–100 km/h (sec)', value: '14.5' }] },
    ],
    images: ['/gallery/alto.png', '/gallery/alto.png', '/gallery/alto.png', '/gallery/alto.png'],
  },
]

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gariwala')
  // Clear existing and re-insert all
  await Product.deleteMany({})
  for (const p of products) {
    await Product.create(p)
    console.log(`✓ Inserted: ${p.name} | Category: ${p.category}`)
  }
  console.log(`\nTotal: ${products.length} products seeded.`)
  await mongoose.disconnect()
}

seed().catch(console.error)
