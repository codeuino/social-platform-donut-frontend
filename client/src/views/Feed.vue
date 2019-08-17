<template>
    <div class="wrapper" :class="$store.state.darkMode ? 'content-dark-2' : '' ">
        <SideNavigation/>
        <FeedGroup :postsArray="posts"/>
        <Recent/>
        <!-- <div>
        <b-jumbotron class="mb-0" style="border-radius:0" :header="Welcome" :bg-variant="$store.state.darkMode ? 'dark' : 'info'"  text-variant="white" />
        </div>
        <hr v-if="$store.state.darkMode" class="mb-0 mt-0">
        <div :class="$store.state.darkMode ? 'bg-dark' : 'light' ">
            <b-container>
                <b-button v-b-modal.modal-2  class="bg-primary btn-lg">Create a Post </b-button>
                <router-link :to="getLikedProjectsLink" ><a href="" class="float-right">Liked Projects</a></router-link>
                <b-modal size="xl" ok-only ok-variant="secondary" ok-title="Cancel"  id="modal-2"  title="Create A Post">
                    <CreatePost />
                </b-modal>
            </b-container>
        </div>
        <FeedGroup v-if="posts" v-bind:postsArray="posts" />
        <b-container v-if="posts.length==0">
            <h5 :class="$store.state.darkMode ? 'text-white' : '' ">No Posts Yet, Go Make One!</h5>
        </b-container>  -->

    </div>
</template>

<script>
// here I'm importing a test datat okay ;)
import { mapActions } from 'vuex'
import SideNavigation from '@/components/SideNavigation.vue'
import Recent from '@/components/Recent.vue'
import FeedGroup from '@/components/FeedGroup.vue'
export default {
  name: 'Feed',
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
      // This works when user login or signup using github so, we need to push data to vue app, so we use query for that
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
    const resp = await fetch(this.$store.state.BaseURL + '/fetchFeed', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.$session.get('token')
      }
    })
    const content = await resp.json()
    console.log(content)
    if (content.status === 1) {
      this.posts = content.feed
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
.content-dark-2{
  background-color: #121212;
}
</style>
