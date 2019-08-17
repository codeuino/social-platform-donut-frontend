if (workbox) {
  console.log(`Workbox is loaded`)

  workbox.precaching.precacheAndRoute(self.__precacheManifest)
  self.addEventListener('push', event => {
    const data = event.data.json()
    console.log(data.notification)
    self.registration.showNotification(data.notification.title, {
      title: data.notification.title,
      body: 'Yay it works!'
    })
  })
} else {
  console.log(`Workbox didn't load`)
}
