<template>
    <div class="wrapper">
        <div v-if="isloading">
            <b-container class="text-center">
              <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
              <h4>Please Wait Do not Refresh</h4>
            </b-container>
        </div>
        <div v-if="!isloading" class="w-100">
                <b-row class="shadow-lg">
                        <UserDetail :user="profile.userDetails" @FollowerIncoming='toggleFollower'  />
                </b-row>
                <b-row>
                    <div class="w-100">
                        <FeedGroup :postsArray="profile.posts"/>
                    </div>
                </b-row>
        </div>
    </div>
</template>

<script>
import FeedGroup from '@/components/FeedGroup.vue'
import UserDetail from '@/components/Userdetail.vue'
import User from '@/assets/test_data/users'
export default {
  name: 'ProfileView',
  components: {
    UserDetail,
    FeedGroup
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
    this.profile.userDetails = User
    this.profile.posts = User.posts
    this.isloading = false
  },
  methods: {
    toggleFollower (arg1) {
      if (arg1 === 0) {
        // user doesn't wants to follow the profile anymore, we can add backend calls and remove user for follower list using the id
        // console.log(arg1)
      } else {
        // User wanna follow this profile
        // console.log(arg1)
      }
    }
  },
  created () {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    }
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
