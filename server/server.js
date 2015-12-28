'use strict';

const Hapi        = require('Hapi');
const server      = new Hapi.Server();
const port        = 3357;
server.connection({ port: port, routes: { cors: true } });

const io          = require('socket.io')(server.listener);
const SocketIoJwt = require('socketio-jwt');
const _           = require('lodash');
const chalk       = require('chalk');
let connections   = [];

server.route(require('./routes/api'));

io.sockets.on('connection', SocketIoJwt.authorize({
  secret: 'Ionic2ChatAppSecretToken!!',
  timeout: 15000
})).on('authenticated', (socket) => {
  socket.id = socket.decoded_token.id;
  socket.name = socket.decoded_token.name;
  socket.avatar = socket.decoded_token.avatar;
  connections.push(socket);
  console.log(chalk.green('User', socket.name, '(' + socket.id + ') connected.'));

  emitOnlineUsers();

  socket.on('disconnect', () => {
    console.log(chalk.red('User', socket.name, '(' + socket.id + ') disconnected'));
    connections.splice(connections.indexOf(socket), 1);
    emitOnlineUsers();
  });

  socket.on('sendMessage', (msg, cb) => {
    let index = _.findIndex(connections, (c) => { return c.id === msg.recipient.id });
    connections[index].emit('onMessage', msg);
    return cb({status: true});
  });

  function emitOnlineUsers() {
    connections.forEach((socket) => {
      socket.emit('onlineUsers', onlineUsers(socket));
    });
  }

  function onlineUsers(socket) {
    let friends = connections.slice();
    friends = _.remove(friends, (friend) => {
      return friend.id !== socket.id;
    });
    return _.map(friends, (obj) => { return _.pick(obj, 'id', 'name', 'avatar'); });
  }

});

server.start(() => {
  console.log(chalk.green('Server running at port', port));
});
