const NodeGeocoder = require('node-geocoder');
const dotenv = require('dotenv');

// Load env vars
const GEOCODER_PROVIDER = require('../config/keys').GEOCODER_PROVIDER;
const GEOCODER_API_KEY = require('../config/keys').GEOCODER_API_KEY;


const options = {
    provider: GEOCODER_PROVIDER,
    httpAdapter: 'https',
    apiKey: GEOCODER_API_KEY,
    formatter: null
}

const geocoder = NodeGeocoder(options);

module.exports = geocoder;