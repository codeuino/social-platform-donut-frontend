<template>
    <div class="wrapper" :class="$store.state.darkMode ? 'bg-dark' : '' ">
        <SideNavigation/>
        <router-link :to="getLikedProjectsLink" ><a href="" class="liked-projects">Liked Projects</a></router-link>
        <FeedGroup :postsArray="posts"/>
        <Recent/>
    </div>
</template>

<script>
// here I'm importing a test datat okay ;)
import { mapActions } from 'vuex'
import SideNavigation from '@/components/SideNavigation.vue'
import Recent from '@/components/Recent.vue'
import FeedGroup from '@/components/FeedGroup.vue'
export default {
  name: 'ProjectFeed',
  components: {
    SideNavigation,
    FeedGroup,
    Recent
  },
  data () {
    return {
      posts: [] // in future it will be replaces by a empty array, and first data will be fetched from server then grouped in twos :) , then added to this state.
    }
  },
  methods: {
    ...mapActions({
      LoginOrout: 'LoginOrout'
    })
  },
  computed: {
    Welcome () {
      return 'Welcome, ' + this.$session.get('User')
    },
    getLikedProjectsLink () {
      return `/projects/liked/${this.$session.get('UserID')}`
    }
  },
  async beforeCreate () {
    if (this.$route.query.token) {
      let query = this.$route.query
      console.log(query)
      this.$session.start()
      await this.$session.set('token', query.token)
      this.$store.state.isLogged = true
      this.$session.set('User', query.name)
      this.$session.set('UserID', this.$route.params.id)
    }
    // First we need to check whether the token exist then backedn can check and if some error comes, it will send back to login page
    if (!this.$session.exists()) {
      this.$router.push('/login')
    }
    const resp = await fetch(this.$store.state.BaseURL + '/projects/fetchProjects', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.$session.get('token')
      }
    })
    if (resp.status === 200) {
      const content = await resp.json()

      this.posts = content.projects
    } else {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap');

#feed {min-height:100vh;}
.light {
  background-color: #edf2fb;
}
.wrapper {
  min-height:96vh;
  background-color:#edf2fb;
  padding:10px;
  padding-top: 35px;
  font-family: 'Josefin Sans', sans-serif;

}
.liked-projects {
  margin-left:100px;
  position: absolute;

}
</style>
