<template>
  <v-app>
    <NavigationBar v-bind:isLogged="isLogged" />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'
export default {
  name: 'App',
  components: {
    NavigationBar,
  },
  
  data () {
    return {
      isLogged:true,
    }
  }
}
</script>
