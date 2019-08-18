<template>
    <div >
        <b-navbar v-if="isLogged" toggleable="sm" class="navLogged text-white d-flex">
            <router-link :to="`/feed/${id}`"><b-navbar-brand class="text-white"><b >{{getNavbarName}}</b></b-navbar-brand></router-link>
            <div class="navbar navbar-dark justify-content-end">
              <ul class="nav justify-content-end">
                <li class="nav-item ">
                  <a class="nav-link " href="#"><i class="fa fa-search" aria-hidden="true"></i></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#"><i class="fas fa-bullhorn"></i></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#"><i class="fa fa-comments" aria-hidden="true"></i></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#"><i class="fas fa-ellipsis-h"></i></a>
                </li>
              </ul>
            </div>
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
    getNavbarName () {
      return this.$session.get('navbarName')
    },
    id () {
      return this.$session.get('UserID')
    },
    isLogged () {
      return this.$store.state.isLogged
    }
  },
  methods: {

  }

}
</script>
<style scoped>
nav {
  position: fixed;
  width: 100%;
  min-height:80px;
  z-index: 10;
}
.navLogged {
  background-color: #538cd3;
}
.nav-item > a {
  color:white;
  margin-right:10px;
}
</style>
