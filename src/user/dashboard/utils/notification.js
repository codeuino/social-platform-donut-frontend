//  import { ToastContainer, toast } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";

 export const initializeSockets = (state, donutIcon, addToNotification) => {
   console.log('socket.io instance ', state)
   state.socket.on("connect", () => {
     console.log(
       "Your socket is successfully set up!"
     );

     // USER RELATED NOTIFICATIONS
     state.socket.on('user connected', () => {
       console.log('user connected message!')
       addToNotification({
         imgSrc: donutIcon,
         heading: 'Welcome to donut!',
         content: 'Nice to see you here!',
         tag: 'Welcome'
       })
     })

   });

   state.socket.on('Password update', (data) => {
     let userId = JSON.stringify(localStorage.getItem("userId"));
     if(userId === data.userId) {
      addToNotification({
        imgSrc: donutIcon,
        heading: "Forgot password!",
        content: `${data.data}`,
        tag: "Update",
      });
     }
   })

   state.socket.on('Account activate', (data) => {
     let userId = JSON.stringify(localStorage.getItem('userId'))
     if(userId === data.userId){
       addToNotification({
        imgSrc: donutIcon,
        heading: 'Account activate',
        content: `${data.data}`,
        tag: 'Activate'
      })
     }
   })

   state.socket.on('New follower', (data) => {
     let userId = JSON.stringify(localStorage.getItem('userId'))
     if (userId === data.followId) {
      addToNotification({
        imgSrc: donutIcon,
        heading: 'New follower',
        content: `${data.name} started following you!`,
        tag: 'Follower'
      })
     }
   })
  
   state.socket.on("test response", (data) => {
      console.log("test response data ", data);
   });

   // PROJECT RELATED NOTIFICATIONS
   state.socket.on("new project", data => {
      addToNotification({
        imgSrc: donutIcon,
        heading: 'New Project!',
        content: `${data.data} is added!`,
        tag: 'New!'
      })
   });


    // ORG RELATED NOTIFICATIONS
    state.socket.on('org', () => {
      console.log('org invoked in client side')
    })

    state.socket.on("new org created", (data) => {
      addToNotification({
        imgSrc: donutIcon,
        heading: "New org!",
        content: `${data.data} is created!`,
        tag: "New",
      });
    });

    state.socket.on("org deleted", (data) => {
      addToNotification({
        imgSrc: donutIcon,
        heading: "Org deleted!",
        content: `${data.data} is deleted!`,
        tag: "Delete",
      });
    });

    state.socket.on("org under maintenance", (data) => {
      addToNotification({
        imgSrc: donutIcon,
        heading: "Maintenance mode on!", 
        content: `${data.data} is kept under maintenance!`,
        tag: "Maintenance",
      });
    });

    state.socket.on("org revoked maintenance", (data) => {
      addToNotification({
        imgSrc: donutIcon,
        heading: "Maintenance mode off!",
        content: `${data.data} is revoked from maintenance!`,
        tag: "Maintenance",
      }); 
    });



   // EVENT RELATED NOTIFICATIONS
   state.socket.on("new event created", data => {
     addToNotification({
       imgSrc: donutIcon,
       heading: 'New Event!',
       content: `${data.data} is added!`,
       tag: 'New!'
     })
   });

   state.socket.on("event update", data => {
     addToNotification({
       imgSrc: donutIcon,
       heading: 'Event update!',
       content: `${data.data}`,
       tag: 'Update'
     })
   });

   state.socket.on("already rsvp", data => {
     addToNotification({
       imgSrc: donutIcon,
       heading: 'Already rsvp!',
       content: `${data.data}`,
       tag: 'RSVP'
     })
   });

   state.socket.on("rsvp done", data => {
     addToNotification({
       imgSrc: donutIcon,
       heading: 'RSVP done!',
       content: `${data.data}`,
       tag: '+1 RSVP'
     })
   });

    state.socket.on("event deleted", data => {
     addToNotification({
       imgSrc: donutIcon,
       heading: 'Event deleted!',
       content: `${data.data} deleted!`,
       tag: 'Delete'
     })
   });


   // POST RELATED NOTIFICATIONS
   state.socket.on("new post created", data => {
     console.log('new post invoked', data)
     addToNotification({
       imgSrc: donutIcon,
       heading: 'New Post!',
       content: `${data.data} is added!`,
       tag: 'New!'
     })
   });

   

   // INTERNET RELATED ISSUES NOTIFICATIONS
   state.socket.on("internet issue", data => {
     console.log("You went offline");
     addToNotification({
       imgSrc: donutIcon,
       heading: 'Offline!',
       content: 'You got internet issues and are offline.',
     })
   });

   state.socket.on("internet issue resolved", data => {
     console.log("you are online again!");
     addToNotification({
        imgSrc: donutIcon,
        heading: 'Online!',
        content: 'You are online now!',
     });
   });
 };