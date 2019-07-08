
module.exports = {
  devServer: {
    proxy: 'http://localhost:3000/'
  },
  // ...other vue-cli plugin options...
  pwa: {
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'public/service-worker.js'
      // ...other Workbox options...
    }
  }
}
