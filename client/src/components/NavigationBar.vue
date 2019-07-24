<template>
    <div >
        <b-navbar v-if="this.isLogged" toggleable="sm" type="dark" variant="dark">
            <router-link :to="`/feed/${id}`"><b-navbar-brand >DONUT</b-navbar-brand></router-link>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <router-link class="text-white" :to="`/dashboard/${id}`"> DashBoard</router-link>
                <router-link class="text-white ml-2" :to="`/profile/${id}`">Profile</router-link>
                <router-link class="text-white ml-2" :to="`/events/feed`">Events</router-link>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto mr-auto">
                <b-nav-form>
                <b-form-input size="md" class="mr-sm-2 bg-dark" placeholder="Search"></b-form-input>
                <b-button size="md" class="my-2 my-sm-0 "  type="submit"><v-icon  small color="white">mdi-magnify</v-icon></b-button>
                </b-nav-form>
            </b-navbar-nav>
            <b-navbar-nav>
            <b-nav-item-dropdown right>
                <template slot="button-content"><v-icon color="white">mdi-account</v-icon></template>
                <b-dropdown-item><router-link class="text-dark" :to="`/settings/${id}`">Setting</router-link></b-dropdown-item>
                <b-dropdown-item><router-link class="text-dark" :to="`/portfolio/${id}`">Portfolio</router-link></b-dropdown-item>
                <b-dropdown-item @click="toggleView">{{$store.state.darkMode ? 'Disable' : 'Enable'}} Dark Mode</b-dropdown-item>
                <b-dropdown-item href="/login">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <b-navbar v-else variant="dark" type="dark">
            <b-navbar-brand href="#">DONUT</b-navbar-brand>
            <b-navbar-nav class="ml-auto pr-2">
                <b-nav-item href="/signup">SignUp</b-nav-item>
                <b-nav-item href="/login">LogIn</b-nav-item>

            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'NavigationBar',
  components: {
  },
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
    id () {
      return this.$session.get('UserID')
    },
    isLogged () {
      return this.$session.get('isLogged')
    }
  },
  methods: {
    ...mapActions({
      toggleDarkMode: 'toggleDarkMode'
    }),
    toggleView () {
      this.toggleDarkMode(!this.$store.state.darkMode)
    }
  }

}
</script>
<style scoped>
nav {
  position: fixed;
  width: 100%;
  min-height:55px;
  z-index: 2;
}
</style>
