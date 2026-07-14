const mongoose = require('mongoose')
const Product = require('./models/Product')
require('dotenv').config()

const civic = {
  id: 'honda-civic',
  name: 'Honda Civic',
  model: 'FE1-GNKH (11th Gen)',
  category: 'Sedan',
  type: 'Sedan',
  inStock: true,
  image: '/gallery/civic.jpg',
  overview: 'The 11th generation Honda Civic is a bold reimagining of the world\'s most popular compact sedan. Built on Honda\'s global platform, it features a sleek fastback silhouette, a turbocharged 1.5L VTEC engine, and Honda SENSING — a suite of advanced safety technologies. With its spacious cabin, 519-litre boot, and refined ride quality, the Civic delivers an exceptional balance of performance, comfort, and everyday practicality.',
  specs: [
    'Engine: 1.5L VTEC Turbo',
    'Power: 174 HP @ 6,000 rpm',
    'Transmission: CVT Automatic',
    'Drive: Front Wheel Drive'
  ],
  specGroups: [
    {
      label: 'Engine',
      items: [
        { label: 'Engine Type',           value: '1.5L 4-cylinder DOHC VTEC Turbo' },
        { label: 'Displacement',          value: '1,498 cc' },
        { label: 'Max Power',             value: '174 hp @ 6,000 rpm' },
        { label: 'Max Torque',            value: '220 N·m @ 1,700–5,000 rpm' },
        { label: 'Compression Ratio',     value: '10.3 : 1' },
        { label: 'Fuel System',           value: 'PGM-FI Direct Injection' },
        { label: 'Emission Standard',     value: 'Euro 6' },
      ],
    },
    {
      label: 'Transmission',
      items: [
        { label: 'Gearbox',   value: 'CVT (Continuously Variable Transmission)' },
        { label: 'Drive',     value: 'Front Wheel Drive (FWD)' },
        { label: 'Gear Ratios', value: 'Simulated 7-speed paddle shift' },
      ],
    },
    {
      label: 'Suspension & Steering',
      items: [
        { label: 'Front Suspension', value: 'MacPherson Strut with stabiliser bar' },
        { label: 'Rear Suspension',  value: 'Multi-link independent' },
        { label: 'Steering Type',    value: 'Electric Power-Assisted (EPAS)' },
        { label: 'Turning Radius',   value: '5.5 m' },
      ],
    },
    {
      label: 'Brakes',
      items: [
        { label: 'Front Brakes', value: 'Ventilated disc, 305 mm' },
        { label: 'Rear Brakes',  value: 'Solid disc, 262 mm' },
        { label: 'ABS',          value: 'Standard with EBD & Brake Assist' },
      ],
    },
    {
      label: 'Wheels & Tyres',
      items: [
        { label: 'Tyre Size',   value: '235/40 R18' },
        { label: 'Wheel Size',  value: '18-inch alloy' },
        { label: 'Spare Tyre',  value: 'Temporary spare (T145/80 R17)' },
      ],
    },
    {
      label: 'Dimensions',
      items: [
        { label: 'Overall Length',  value: '4,674 mm' },
        { label: 'Overall Width',   value: '1,802 mm' },
        { label: 'Overall Height',  value: '1,415 mm' },
        { label: 'Wheelbase',       value: '2,735 mm' },
        { label: 'Front Track',     value: '1,560 mm' },
        { label: 'Rear Track',      value: '1,560 mm' },
        { label: 'Ground Clearance',value: '135 mm' },
      ],
    },
    {
      label: 'Capacity & Weight',
      items: [
        { label: 'Seating Capacity',  value: '5 persons' },
        { label: 'Boot Capacity',     value: '519 litres' },
        { label: 'Fuel Tank',         value: '47 litres' },
        { label: 'Kerb Weight',       value: '1,272 kg' },
        { label: 'Gross Vehicle Weight', value: '1,720 kg' },
      ],
    },
    {
      label: 'Performance',
      items: [
        { label: 'Fuel Economy (city)',    value: '11.5 km/l' },
        { label: 'Fuel Economy (highway)', value: '16.2 km/l' },
        { label: 'Fuel Economy (combined)',value: '13.5 km/l' },
        { label: '0–100 km/h',            value: '7.8 seconds' },
        { label: 'Top Speed',             value: '215 km/h' },
      ],
    },
    {
      label: 'Safety & Technology',
      items: [
        { label: 'Airbags',              value: '6 (front, side, curtain)' },
        { label: 'Honda SENSING',        value: 'Collision Mitigation Braking, Lane Keeping Assist, Adaptive Cruise Control, Road Departure Mitigation' },
        { label: 'Parking Sensors',      value: 'Front & Rear' },
        { label: 'Reverse Camera',       value: 'Standard with dynamic guidelines' },
        { label: 'Traction Control',     value: 'Standard' },
        { label: 'Vehicle Stability Assist', value: 'Standard' },
        { label: 'Hill Start Assist',    value: 'Standard' },
        { label: 'ISOFIX',               value: '2 rear seats' },
      ],
    },
    {
      label: 'Comfort & Features',
      items: [
        { label: 'Infotainment',     value: '9-inch Honda CONNECT touchscreen' },
        { label: 'Apple CarPlay',    value: 'Wireless' },
        { label: 'Android Auto',     value: 'Wireless' },
        { label: 'Climate Control',  value: 'Dual-zone automatic' },
        { label: 'Sunroof',          value: 'Power panoramic sunroof' },
        { label: 'Seats',            value: 'Leather-trimmed, 8-way power driver seat' },
        { label: 'Keyless Entry',    value: 'Smart entry with push-button start' },
        { label: 'Ambient Lighting', value: '8-colour interior ambient lighting' },
      ],
    },
    {
      label: 'Warranty',
      items: [
        { label: 'Basic Warranty',    value: '3 years / 100,000 km' },
        { label: 'Powertrain',        value: '5 years / 100,000 km' },
        { label: 'Roadside Assist',   value: '3 years unlimited km' },
      ],
    },
  ],
  images: [
    '/gallery/civic.jpg',
    '/gallery/civic2.jpg',
    '/gallery/civic.jpg',
    '/gallery/civic2.jpg',
  ],
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gariwala')
  await Product.findOneAndUpdate({ id: 'honda-civic' }, civic, { upsert: true, new: true })
  console.log('✓ Honda Civic updated with real data | Category: Sedan | Images: local')
  await mongoose.disconnect()
}

run().catch(console.error)
