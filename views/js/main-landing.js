import { events } from './events.js';

$(document).ready(function() {
  const onNotify = function(data) {
    console.log('Notification received:');
    console.log(data);
  }

  events.subscribe('notification', onNotify);
});

