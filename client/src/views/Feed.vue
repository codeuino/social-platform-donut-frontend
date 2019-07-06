<template>
    <div id="feed" :class="$store.state.darkMode ? 'bg-dark' : '' ">
        <div >
        <b-jumbotron class="mb-0" style="border-radius:0" :header="Welcome" :bg-variant="$store.state.darkMode ? 'dark' : 'info'"  text-variant="white" />
        </div>
        <hr v-if="$store.state.darkMode" class="mb-0 mt-0">
        <!-- div for create post button -->
        <div :class="$store.state.darkMode ? 'bg-dark' : '' ">
            <b-container>
                <b-button v-b-modal.modal-2  class="bg-primary btn-lg">Create a Post </b-button>
                <b-modal size="xl" ok-only ok-variant="secondary" ok-title="Cancel"  id="modal-2"  title="Create A Post">
                    <CreatePost />
                </b-modal>
            </b-container>
        </div>
        <FeedGroup v-if="posts" v-bind:postsArray="posts" />
        <b-container v-if="posts.length==0">
            <h5 :class="$store.state.darkMode ? 'text-white' : '' ">No Posts Yet, Go Make One!</h5>
        </b-container>
    </div>
</template>

<script>
// here I'm importing a test datat okay ;)
import User from '@/assets/test_data/users'
import { mapActions } from 'vuex'
import FeedGroup from '@/components/FeedGroup.vue'
import CreatePost from '@/components/CreatePost.vue'
export default {
  name: 'Feed',
  components: {
    CreatePost,
    FeedGroup
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
      return 'Welcome, ' + this.$store.state.userDetails.name
    }
  },
  created () {
    // First we need to check whether the token exist then backedn can check and if some error comes, it will send back to login page
    if (this.$store.state.token) {
      this.posts = User.posts
      this.LoginOrout(true)
      // Now we updated the userDetails in state. We should now fetch posts
    } else {
      this.$router.push({ path: 'login', query: { error: 'true' } })
    }
  }
}
</script>

<style scoped>
#feed {min-height:100vh;}
</style>
