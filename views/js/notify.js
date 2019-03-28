var events = {
  events: {},

  subscribe: function(eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },

  unsubscribe: function(eventName, fn) {
    if(this.events[eventName]) {
      let idx = this.events[eventName].indexOf(fn);
      this.events[eventName].splice(idx, 1);
    }
  },

  publish: function(eventName, data) {
    if(this.events[eventName]) {
      this.events[eventName].forEach(function(fn) {
        fn(data);
      });
    }
  }
}

var vueObject = new Vue({
  el: '#notification-list',
  data: {
    notificationList: [
      { fname: 'FName', lname: 'LName' },
      { fname: 'FName', lname: 'LName' }
    ]
  }
});

const onNotify = function(notification) {
  vueObject.notificationList.push(notification);
}

$(document).ready(function() {
  events.subscribe('notification', onNotify);
  var socket = io();

  socket.on('notification', function(data) {
    events.publish('notification', data);
  });
});

