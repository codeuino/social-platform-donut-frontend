<template>
    <v-app>
       <div class="main">
         <h3 class="bg-primary text-center text-white py-2" id="offCard">
            You're Offline, You Can Use Donut, but any changes won't be saved
         </h3>
         <h3 class="bg-success text-center text-white py-2" id="onCard">
            You're Online, Welcome Back
         </h3>
        <NavigationBar  />
        <v-content class="content">
          <router-view></router-view>
        </v-content>
      </div>
  </v-app>

</template>

<script>
import NavigationBar from './components/NavigationBar.vue'
export default {
  name: 'App',
  components: {
    NavigationBar
  },
  data () {
    return {
      // KEEP THIS ON APP.VUE!
    }
  },
  created () {
    window.addEventListener('offline', function (e) {
      var offlineCard = document.getElementById('offCard')
      offlineCard.style.display = 'block'
      setTimeout(function () {
        offlineCard.style.display = 'none'
      }, 2000)
    })

    window.addEventListener('online', function (e) {
      var offlineCard = document.getElementById('offCard')
      offlineCard.style.display = 'none'
      let onlineCard = document.getElementById('onCard')
      onlineCard.style.display = 'block'
      setTimeout(function () {
        onlineCard.style.display = 'none'
      }, 2000)
    })
  }

}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');
#offCard {
  display: none;
}
#onCard {
  display: none;
}
.content {
  margin-top: 55px;
}

</style>
