'use strict';

const Api = require('../controllers/api');

module.exports = [
  { method: 'POST', path: '/api/generate-token', config: Api.generateToken }
];