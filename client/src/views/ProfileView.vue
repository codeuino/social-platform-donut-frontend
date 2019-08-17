<template>
    <div class="wrapper">
        <div v-if="isloading">
            <b-container class="text-center">
              <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
              <h4>Please Wait Do not Refresh</h4>
            </b-container>
        </div>
        <div v-if="!isloading" class="w-100">
                <SideNavigation/>
                <UserDetail :user="profile.userDetails" @FollowerIncoming='toggleFollower'  />
                <FeedGroup :postsArray="profile.posts"/>
        </div>
    </div>
</template>

<script>
import SideNavigation from '@/components/SideNavigation.vue'
import FeedGroup from '@/components/FeedGroup.vue'
import UserDetail from '@/components/Userdetail.vue'
import Authenticate from '@/services/Auth'

export default {
  name: 'ProfileView',
  components: {
    UserDetail,
    FeedGroup,
    SideNavigation
  },
  data () {
    return {
      isloading: true,
      profile: {
        userDetails: null,
        posts: null
      }

    }
  },
  mounted () {
  },
  methods: {
    toggleFollower (arg1) {
      if (arg1 === 0) {
        // user doesn't wants to follow the profile anymore, we can add backend calls and remove user for follower list using the id
        console.log(arg1)
      } else {
        // User wanna follow this profile
        console.log(arg1)
      }
    }
  },
  async created () {
    Authenticate.Authenticate(this)
    let response = await fetch(this.$store.state.BaseURL + '/profile/getProfile', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.$session.get('token')
      }
    })
    var content = await response.json()
    this.profile.userDetails = content.user
    this.profile.posts = content.user.Projects
    this.isloading = false
  }
}
</script>

<style scoped>
@media only screen and (min-width:1000px){
    .container {
        max-width:1300px !important;
    }
}
.wrapper {
    overflow-x: hidden;
}
</style>
