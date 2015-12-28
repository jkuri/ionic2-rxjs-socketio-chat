'use strict';

const jwt     = require('jsonwebtoken');
const config  = require('../config/constants');

function createToken(user) {
  return jwt.sign(user, config.secret);
}

function generateRandomId() {
  return Math.random().toString(36).substring(7);
}

function generateRandomAvatar() {
  let genders = ['men', 'women'];
  let g = genders[Math.floor(Math.random() * 2)];
  let num = Math.floor(Math.random() * 50) + 1;
  return 'http://api.randomuser.me/portraits/thumb/' + g + '/' + num + '.jpg';
}

exports.generateToken = {
  handler: (request, reply) => {
    let data = JSON.parse(request.payload);
    if (!data.name) {
      return reply({status: false});
    } else {
      let user = {
        id: generateRandomId(),
        name: data.name,
        avatar: generateRandomAvatar()
      };
      return reply({status: true, jwt: createToken(user)});
    }
  }
};