<template>
  <v-app>
    <NavigationBar v-bind:isLogged="isLogged"  class="mb-4"/> <!--- Hardcoded margin-bottom , as the navbar is stciky so the it covers the content in first line -->
    <v-content class="mt-5"> <!-- Hardcoded margin-top 5 for same reason -->
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
