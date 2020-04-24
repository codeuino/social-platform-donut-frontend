const events_list = [{
  _id: '1',
  eventName: 'Student-teacher meeting',
  description: {
      shortDescription: 'This is a short description',
      longDescription: 'Mauris vestibulum lorem eu lacus fringilla, quis cursus arcu elementum. Pellentesque dignissim euismod massa id luctus. Donec egestas velit euismod mi porttitor, quis imperdiet ipsum bibendum. Mauris ultrices enim eget euismod tincidunt. Nulla a nunc et mi posuere ornare. Donec libero nisl, auctor ac leo sed, mollis rhoncus tellus. Donec commodo sapien et imperdiet auctor. Etiam non malesuada tellus, ut pretium felis. Mauris sed varius erat. Suspendisse in est venenatis, tincidunt sem non, ultricies libero. Aliquam elit mi, gravida dapibus porttitor pretium, cursus ut ipsum. Donec fringilla nulla sed dolor finibus elementum.'
  },
  slots: '655',
  eventDate: "June 5, 2018 4:31 AM",
  createdAt: "June 5, 2018 4:31 AM",
  isOnline: true,
  rsvpYes: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f'],
  rsvpNo: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f'],
  rsvpMaybe: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f']
},
{
  _id: '2',
  eventName: 'Annual meetup',
  description: {
      shortDescription: 'This is a short description',
      longDescription: 'Mauris vestibulum lorem eu lacus fringilla, quis cursus arcu elementum. Pellentesque dignissim euismod massa id luctus. Donec egestas velit euismod mi porttitor, quis imperdiet ipsum bibendum. Mauris ultrices enim eget euismod tincidunt. Nulla a nunc et mi posuere ornare. Donec libero nisl, auctor ac leo sed, mollis rhoncus tellus. Donec commodo sapien et imperdiet auctor. Etiam non malesuada tellus, ut pretium felis. Mauris sed varius erat. Suspendisse in est venenatis, tincidunt sem non, ultricies libero. Aliquam elit mi, gravida dapibus porttitor pretium, cursus ut ipsum. Donec fringilla nulla sed dolor finibus elementum.'
  },
  slots: '655',
  location: 'New Delhi',
  eventDate: "June 5, 2018 4:31 AM",
  createdAt: "June 5, 2018 4:31 AM",
  isOnline: false,
  rsvpYes: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f'],
  rsvpNo: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f'],
  rsvpMaybe: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f']

},
{
  _id: '3',
  eventName: 'mentor session',
  description: {
      shortDescription: 'This is a short description',
      longDescription: 'Mauris vestibulum lorem eu lacus fringilla, quis cursus arcu elementum. Pellentesque dignissim euismod massa id luctus. Donec egestas velit euismod mi porttitor, quis imperdiet ipsum bibendum. Mauris ultrices enim eget euismod tincidunt. Nulla a nunc et mi posuere ornare. Donec libero nisl, auctor ac leo sed, mollis rhoncus tellus. Donec commodo sapien et imperdiet auctor. Etiam non malesuada tellus, ut pretium felis. Mauris sed varius erat. Suspendisse in est venenatis, tincidunt sem non, ultricies libero. Aliquam elit mi, gravida dapibus porttitor pretium, cursus ut ipsum. Donec fringilla nulla sed dolor finibus elementum.'
  },
  slots: '655',
  eventDate: "June 5, 2018 4:31 AM",
  createdAt: "June 5, 2018 4:31 AM",
  isOnline: true,
  rsvpYes: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f'],
  rsvpNo: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f'],
  rsvpMaybe: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f']
},
{
  _id: '4',
  eventName: 'Annual meetup',
  description: {
      shortDescription: 'This is a short description',
      longDescription: 'Mauris vestibulum lorem eu lacus fringilla, quis cursus arcu elementum. Pellentesque dignissim euismod massa id luctus. Donec egestas velit euismod mi porttitor, quis imperdiet ipsum bibendum. Mauris ultrices enim eget euismod tincidunt. Nulla a nunc et mi posuere ornare. Donec libero nisl, auctor ac leo sed, mollis rhoncus tellus. Donec commodo sapien et imperdiet auctor. Etiam non malesuada tellus, ut pretium felis. Mauris sed varius erat. Suspendisse in est venenatis, tincidunt sem non, ultricies libero. Aliquam elit mi, gravida dapibus porttitor pretium, cursus ut ipsum. Donec fringilla nulla sed dolor finibus elementum.'
  },
  slots: '655',
  eventDate: "June 5, 2018 4:31 AM",
  createdAt: "June 5, 2018 4:31 AM",
  isOnline: true,
  rsvpYes: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f'],
  rsvpNo: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f'],
  rsvpMaybe: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f']
},
{
  _id: '5',
  eventName: 'mentor session',
  description: {
      shortDescription: 'This is a short description',
      longDescription: 'Mauris vestibulum lorem eu lacus fringilla, quis cursus arcu elementum. Pellentesque dignissim euismod massa id luctus. Donec egestas velit euismod mi porttitor, quis imperdiet ipsum bibendum. Mauris ultrices enim eget euismod tincidunt. Nulla a nunc et mi posuere ornare. Donec libero nisl, auctor ac leo sed, mollis rhoncus tellus. Donec commodo sapien et imperdiet auctor. Etiam non malesuada tellus, ut pretium felis. Mauris sed varius erat. Suspendisse in est venenatis, tincidunt sem non, ultricies libero. Aliquam elit mi, gravida dapibus porttitor pretium, cursus ut ipsum. Donec fringilla nulla sed dolor finibus elementum.'
  },
  slots: '655',
  location: 'New Delhi',
  eventDate: "June 5, 2018 4:31 AM",
  createdAt: "June 5, 2018 4:31 AM",
  isOnline: false,
  rsvpYes: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f'],
  rsvpNo: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f'],
  rsvpMaybe: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f']

},
{
  _id: '6',
  eventName: 'Student-teacher meeting',
  description: {
      shortDescription: 'This is a short description',
      longDescription: 'Mauris vestibulum lorem eu lacus fringilla, quis cursus arcu elementum. Pellentesque dignissim euismod massa id luctus. Donec egestas velit euismod mi porttitor, quis imperdiet ipsum bibendum. Mauris ultrices enim eget euismod tincidunt. Nulla a nunc et mi posuere ornare. Donec libero nisl, auctor ac leo sed, mollis rhoncus tellus. Donec commodo sapien et imperdiet auctor. Etiam non malesuada tellus, ut pretium felis. Mauris sed varius erat. Suspendisse in est venenatis, tincidunt sem non, ultricies libero. Aliquam elit mi, gravida dapibus porttitor pretium, cursus ut ipsum. Donec fringilla nulla sed dolor finibus elementum.'
  },
  slots: '655',
  eventDate: "June 5, 2018 4:31 AM",
  createdAt: "June 5, 2018 4:31 AM",
  isOnline: true,
  rsvpYes: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f'],
  rsvpNo: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f'],
  rsvpMaybe: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f']
},
{
  _id: '7',
  eventName: 'mentor session',
  description: {
      shortDescription: 'This is a short description',
      longDescription: 'Mauris vestibulum lorem eu lacus fringilla, quis cursus arcu elementum. Pellentesque dignissim euismod massa id luctus. Donec egestas velit euismod mi porttitor, quis imperdiet ipsum bibendum. Mauris ultrices enim eget euismod tincidunt. Nulla a nunc et mi posuere ornare. Donec libero nisl, auctor ac leo sed, mollis rhoncus tellus. Donec commodo sapien et imperdiet auctor. Etiam non malesuada tellus, ut pretium felis. Mauris sed varius erat. Suspendisse in est venenatis, tincidunt sem non, ultricies libero. Aliquam elit mi, gravida dapibus porttitor pretium, cursus ut ipsum. Donec fringilla nulla sed dolor finibus elementum.'
  },
  slots: '655',
  location: 'New Delhi',
  eventDate: "June 5, 2018 4:31 AM",
  createdAt: "June 5, 2018 4:31 AM",
  isOnline: false,
  rsvpYes: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f'],
  rsvpNo: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f'],
  rsvpMaybe: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f']

},
{
  _id: '8',
  eventName: 'Student-teacher meeting',
  description: {
      shortDescription: 'This is a short description',
      longDescription: 'Mauris vestibulum lorem eu lacus fringilla, quis cursus arcu elementum. Pellentesque dignissim euismod massa id luctus. Donec egestas velit euismod mi porttitor, quis imperdiet ipsum bibendum. Mauris ultrices enim eget euismod tincidunt. Nulla a nunc et mi posuere ornare. Donec libero nisl, auctor ac leo sed, mollis rhoncus tellus. Donec commodo sapien et imperdiet auctor. Etiam non malesuada tellus, ut pretium felis. Mauris sed varius erat. Suspendisse in est venenatis, tincidunt sem non, ultricies libero. Aliquam elit mi, gravida dapibus porttitor pretium, cursus ut ipsum. Donec fringilla nulla sed dolor finibus elementum.'
  },
  slots: '655',
  eventDate: "June 5, 2018 4:31 AM",
  createdAt: "June 5, 2018 4:31 AM",
  isOnline: true,
  rsvpYes: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f'],
  rsvpNo: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f'],
  rsvpMaybe: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f']
},
{
  _id: '9',
  eventName: 'Annual meetup',
  description: {
      shortDescription: 'This is a short description',
      longDescription: 'Mauris vestibulum lorem eu lacus fringilla, quis cursus arcu elementum. Pellentesque dignissim euismod massa id luctus. Donec egestas velit euismod mi porttitor, quis imperdiet ipsum bibendum. Mauris ultrices enim eget euismod tincidunt. Nulla a nunc et mi posuere ornare. Donec libero nisl, auctor ac leo sed, mollis rhoncus tellus. Donec commodo sapien et imperdiet auctor. Etiam non malesuada tellus, ut pretium felis. Mauris sed varius erat. Suspendisse in est venenatis, tincidunt sem non, ultricies libero. Aliquam elit mi, gravida dapibus porttitor pretium, cursus ut ipsum. Donec fringilla nulla sed dolor finibus elementum.'
  },
  slots: '655',
  location: 'New Delhi',
  eventDate: "June 5, 2018 4:31 AM",
  createdAt: "June 5, 2018 4:31 AM",
  isOnline: false,
  rsvpYes: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f'],
  rsvpNo: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f'],
  rsvpMaybe: ['5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f', '5e8e3bc68b5d2a0fe4cfc77f']

}
]

export default events_list;