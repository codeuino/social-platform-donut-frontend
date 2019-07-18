import keys from '../assets/config'
let urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export default {
  createSubscription: async () => {
    var status = await Notification.requestPermission(status => {
      console.log('Notification', status)
      return status
    })
    if (status === 'granted') {
      const register = await navigator.serviceWorker.register('/../service-worker.js', { scope: '/' })
      const subscription = register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(keys.PUBLIC_VAPID_KEY)
      })
      return subscription
    }
  }
}
