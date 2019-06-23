<template>
    <div class="bg-dark h-75">
        <div>
            <b-container  class="mb-3">
                <h1 id="head" class="text-center text-white">Welcome To DONUT</h1>
            </b-container>
        </div>
        <div>
            <b-container>
                <Login/>
            </b-container>
        </div>
    </div>
</template>

<script>
import TypeWriter from 'typewriter-effect/dist/core'
import Login from '@/components/Login.vue'

export default {
  name: 'LoginView',
  components: {
    Login
  },
  data () {
    return {

    }
  },
  mounted () {
    // eslint-disable-next-line
    new TypeWriter('#head', {
      strings: ['Welcome', 'Welcome to', 'Welcome to Donut'],
      autoStart: true,
      loop: true
    })
  }
}
</script>

<style scoped>
#head{
    font-size:5vw;
    font-family: 'Raleway', sans-serif;

}
</style>
