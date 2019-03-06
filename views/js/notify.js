import { events } from './events.js';

$(document).ready(function() {
  var socket = io();

  socket.on('notification', function(data) {
    events.publish('notification', data);
  });
});