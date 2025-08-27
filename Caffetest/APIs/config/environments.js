require('dotenv').config();

const environments = {
  development: {
    baseURL: process.env.BASE_URL || 'https://dev-api.example.com',
    apiKey: process.env.API_KEY,
    timeout: parseInt(process.env.API_TIMEOUT) || 30000,
  },
  staging: {
    baseURL: process.env.BASE_URL || 'https://staging-api.example.com',
    apiKey: process.env.API_KEY,
    timeout: parseInt(process.env.API_TIMEOUT) || 30000,
  },
  production: {
    baseURL: process.env.BASE_URL || 'https://api.example.com',
    apiKey: process.env.API_KEY,
    timeout: parseInt(process.env.API_TIMEOUT) || 30000,
  },
};

module.exports = environments[process.env.NODE_ENV] || environments.development;