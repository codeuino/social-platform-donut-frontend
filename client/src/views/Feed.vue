<template>
    <div>
        <div>
        <b-jumbotron  :header="Welcome" bg-variant="info"  text-variant="white" />
        </div>

        <!-- div for create post button -->
        <div>
            <b-container>
                <b-button v-b-modal.modal-1  class="bg-primary btn-lg">Create a Post </b-button>
                <b-modal size="xl" ok-only ok-variant="secondary" ok-title="Cancel"  id="modal-1"  title="Create A Post">
                    <CreatePost />
                </b-modal>
            </b-container>
        </div>

        <FeedGroup v-if="posts" v-bind:postsArray="posts" />
        <b-container v-if="posts.length==0">
            <h5>No Posts Yet, Go Make One!</h5>
        </b-container>
    </div>
</template>

<script>
// here I'm importing a test datat okay ;)
import User from '@/assets/test_data/users'
import {mapActions} from 'vuex';
import FeedGroup from '@/components/FeedGroup.vue'
import CreatePost from '@/components/CreatePost.vue'
import Post from '@/components/Post.vue'
export default {
    name:'Feed',
    components:{
        Post,
        CreatePost,
        FeedGroup
    },
    data(){
        return {
            posts:[], // in future it will be replaces by a empty array, and first data will be fetched from server then grouped in twos :) , then added to this state.
        }
    },
    methods:{
        ...mapActions({
            LoginOrout:'LoginOrout',
            addUser:'addUser'
        }),
    },
    computed: {
        Welcome(){
            return "Welcome, " + this.$store.state.userDetails.name
        }
    },
    created() {
            // First we need to check whether the token exist then backedn can check and if some error comes, it will send back to login page
            if(this.$store.state.token) {
                // Here we'll send request if it works Huuray!
                this.LoginOrout(true)
                console.log(User)
                this.addUser(User)
                // Now we updated the userDetails in state
                //We should now fetch posts 
            }else {
                this.$router.push({path: 'welcome', query:{source: 'login' , error:'true'}})
            }
        },
}
</script>

