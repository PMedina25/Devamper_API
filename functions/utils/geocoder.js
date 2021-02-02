const NodeGeocoder = require('node-geocoder');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();


const options = {
    provider: process.env.GEOCODER_PROVIDER,
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
}

const geocoder = NodeGeocoder(options);

module.exports = geocoder;