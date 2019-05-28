<template>
  <offline @detected-condition="handleConnectivityChange">
    
    <div slot="online">
    <v-app>
    <NavigationBar  /> 
    <v-content > 
      <router-view></router-view>
    </v-content>
  </v-app>
    </div>
    <div slot="offline">
      This is when you're offline
    </div>

  </offline>
  
</template>

<script>
import offline from 'v-offline';
import NavigationBar from './components/NavigationBar.vue'
export default {
  name: 'App',
  components: {
    NavigationBar,
    offline,
  },
  
  data () {
    return {
      isLogged:true,

    }
  },
  methods:{
    handleConnectivityChange(status) {
      console.log(status);
    }   
  },
  mounted(){
    console.log(window)
  }
  
}
</script>
