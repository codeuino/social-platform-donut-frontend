export const setUpSocket = (state, donutIcon, addToNotification) => {
  state.socket.on("New Ticket Notification", (notification) => {
    console.log("ticket notification recieved");
    // console.log(notification);
    const notificationToAdd = {
      //   imgSrc: donutIcon,
      createdAt: notification.createdAt,
      heading: notification.heading,
      content: notification.content,
      tag: notification.tag,
    };
    if (notification.for === "admin") {
      if (localStorage.getItem("admin").toString() === "true") {
        addToNotification(notificationToAdd);
      }
    } else if (notification.for === "moderator") {
      if (localStorage.getItem("ticketModerator").toString() === "true") {
        addToNotification(notificationToAdd);
      }
    } else {
      if (localStorage.getItem("userId").toString() === notification.for) {
        addToNotification(notificationToAdd);
      }
    }
  });
};
