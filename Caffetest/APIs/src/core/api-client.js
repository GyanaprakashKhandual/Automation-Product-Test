const request = require('supertest');
const config = require('../../config/environments');
const logger = require('../utils/logger');

class ApiClient {
  constructor(baseURL = config.baseURL) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    };
    this.request = request(this.baseURL);
  }

  setHeader(key, value) {
    this.defaultHeaders[key] = value;
    return this;
  }

  removeHeader(key) {
    delete this.defaultHeaders[key];
    return this;
  }

  async get(endpoint, queryParams = {}) {
    logger.info(`GET ${endpoint}`);
    return this.request
      .get(endpoint)
      .query(queryParams)
      .set(this.defaultHeaders)
      .timeout(config.timeout);
  }

  async post(endpoint, payload = {}) {
    logger.info(`POST ${endpoint}`);
    return this.request
      .post(endpoint)
      .send(payload)
      .set(this.defaultHeaders)
      .timeout(config.timeout);
  }

  async put(endpoint, payload = {}) {
    logger.info(`PUT ${endpoint}`);
    return this.request
      .put(endpoint)
      .send(payload)
      .set(this.defaultHeaders)
      .timeout(config.timeout);
  }

  async delete(endpoint) {
    logger.info(`DELETE ${endpoint}`);
    return this.request
      .delete(endpoint)
      .set(this.defaultHeaders)
      .timeout(config.timeout);
  }

  async patch(endpoint, payload = {}) {
    logger.info(`PATCH ${endpoint}`);
    return this.request
      .patch(endpoint)
      .send(payload)
      .set(this.defaultHeaders)
      .timeout(config.timeout);
  }
}

module.exports = ApiClient;