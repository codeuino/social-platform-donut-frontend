<template>
    <div class="side-nav" :class="$store.state.darkMode ? 'content-dark' : 'content-light' ">

    <div class="profile-img-wrapper mb-5">
      <center>

        <router-link :to='ProfileLink'><img src="https://image.flaticon.com/icons/svg/17/17004.svg" alt="">
</router-link>
      </center>
    </div>

    <div class="group-1">
      <div class="feed-icon">
      <center>
        <router-link :to='`/feed/${id}`'><i class="fa fa-credit-card" aria-hidden="true"></i>
</router-link>
      </center>
    </div>

    <div class="feed-icon">
      <center>
        <router-link :to='`/projects/${id}`'><i class="fas fa-project-diagram"></i></router-link>
      </center>
    </div>

    <div class="feed-icon">
      <center>
        <router-link :to='`/events/feed/`'><i class="fa fa-calendar" aria-hidden="true"></i></router-link>
      </center>
    </div>

    <div class="feed-icon">
      <center>
        <router-link :to='`/settings/${id}`'><i class="fa fa-cog" aria-hidden="true"></i></router-link>
      </center>
    </div>

    <div class="feed-icon">
      <center>
        <router-link :to='`/dashboard/${id}`'><i class="fa fa-server" aria-hidden="true"></i></router-link>
      </center>
    </div>
    <div class="feed-icon">
      <center>
        <router-link :to='`/portfolio/${id}`'><i class="fa fa-globe" aria-hidden="true"></i></router-link>
      </center>
    </div>
    </div>
    <div class="group-2">
      <div class="feed-icon mb-5">
      <center>
        <router-link to="#"><i @click="toggleView" class="fa fa-moon" aria-hidden="true"></i></router-link>
      </center>
    </div>

    <div class="feed-icon">
      <center>
        <router-link to="#"><i @click="SignOut" class="fas fa-power-off "></i></router-link>
      </center>
    </div>
    </div>

</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SideNavigation',
  computed: {
    id () {
      return this.$session.get('UserID')
    },
    ProfileLink () {
      var id = this.$session.get('UserID')
      var type = this.$session.get('UserType')
      return `/profile?type=${type}&id=${id}`
    }
  },
  methods: {
    ...mapActions({
      toggleDarkMode: 'toggleDarkMode'
    }),
    SignOut () {
      this.$store.state.isLogged = false
      this.$session.destroy()
      this.$router.push('/login')
    },
    toggleView () {
      this.toggleDarkMode(!this.$store.state.darkMode)
    }
  }
}
</script>

<style scoped>
.content-light {
  background-color:white;
}
.content-dark {
  background-color: #1A1A1B;
}
.content-dark > .group-1 > .feed-icon > center > a > i {
  color:white;
}
.content-dark > .group-2 > .feed-icon > center > a > i {
  color:white;
}
.side-nav {
  position:fixed;
  top:56px;
  left:0px;
  min-height:95vh;
  min-width:6vw;
  display:flex;
  padding:15px;
  padding-bottom:0;
  padding-top: 60px;
  flex-direction: column;
  justify-content: space-around;
}
.profile-img-wrapper > center > a> img {
  opacity:0.3;
  height:50px;
}

.feed-icon > center > a > i {
    opacity:0.3;
}
.group-1 {
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.group-2 {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
