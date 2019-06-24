<template>
    <div>
        <b-modal id="modal-1" cancel-disabled  ok-only centered >
            <SocialMedia/>
        </b-modal>
        <div v-if="isloading">
                <b-card class="text-center">
                    <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" ></b-spinner>
                </b-card>
        </div>
        <b-card v-if="!isloading" >
            <b-card-title>{{Currentpost.title}}</b-card-title>
            <p>{{Currentpost.author}}</p>
            <hr>
            <b-card-text v-html="Currentpost.description" />
            <b-card-text>
                <b>Contributors Count: </b>{{Currentpost.contributors_count}}
            </b-card-text>
            <b-card-text  class="stackList">
                <b>Technologies User: </b>
                <ul>
                    <li :key="index" v-for="(lang, index) in Currentpost.lang">{{lang}}</li>
                </ul>
            </b-card-text>
            <b-card-text class="text-center">
                <img :src="Currentpost.cover_img" alt="">

            </b-card-text>
            <b-card-text>
                <div class="GithubBtn btn btn-lg btn-primary">
                    <a :href="Currentpost.social.github">View On Github <v-icon style="font-size:16px;margin-bottom:2px;margin-left:2px;color:white">fab fa-github</v-icon></a>
                </div>
            </b-card-text>
                <v-form @submit="addComment" class="w-100">

                    <b-row align-h="between">

                    <b-col cols="8">
                    <v-text-field
                        v-model="Currentcomment"
                        label="Write Comment"
                        :counter="50"
                        required>
                    </v-text-field>
                    </b-col>

                    <b-col cols="4">
                    <v-btn fab dark small color="pink" >
                    <v-icon dark :style="currentUserLikes" @click="toggleVote">thumb_up</v-icon>
                    </v-btn>

                    <v-btn fab dark small color="pink">
                    <v-icon dark :style="currentUserDisikes" @click="toggleVote">thumb_down</v-icon>
                    </v-btn>

                    <v-btn @click="SETID" fab dark small color="blue" v-b-modal.modal-1>
                    <v-icon dark>mdi-share</v-icon>
                    </v-btn>
                    </b-col>

                    </b-row>

                </v-form>
                <br>
                <b-list-group>
                    <b-list-group-item v-for="(comment, index) in this.comments" :key="index"  class="b-row"><router-link class="text-dark" :to="`/profile/${comment.author_id}`">{{comment.author}}</router-link>
: {{comment.comment}}</b-list-group-item>
                    </b-list-group>

        </b-card>
    </div>
</template>
<script>
import SocialMedia from '@/components/SocialMedia.vue'
export default {
  name: 'singlePost',
  components: {
    SocialMedia
  },
  data () {
    return {
      currentUserId: null,
      isloading: true,
      Currentpost: {
      },
      comments: [],
      Currentcomment: ''
    }
  },
  methods: {
    toggleVote (e) {
      if (e.target.innerHTML === 'thumb_up') {
        if (this.Currentpost.upAnddown[this.currentUserId] === 1) {
          this.Currentpost.upAnddown[this.currentUserId] = null
          // Here he undo his/her like, so now value to be null and sends to backend
        } else {
          this.Currentpost.upAnddown[this.currentUserId] = 1
          // He now likes the post and we should send this to backend
        }
      }
      if (e.target.innerHTML === 'thumb_down') {
        if (this.Currentpost.upAnddown[this.currentUserId] === 0) {
          this.Currentpost.upAnddown[this.currentUserId] = null
          // Here he undo his/her dislike, so now value to be null or we can just remove user from map and sends to backend
        } else {
          this.Currentpost.upAnddown[this.currentUserId] = 0
          // User now dislikes the post and we should send this to backend
        }
      }
    },
    SETID () {
      this.addPostID(this.post.pid)
    },
    addComment (e) {
      // I will add validation, on making validation module so don't panic
      if (this.Currentcomment === '') {
        alert('Please Add Comment')
        e.preventDefault()
      } else {
        var today = new Date()
        let tempComment = {
          author: 'Lakshya', // this.$store.state.userDetails.name,
          author_id: 1, // this.$store.state.userDetails.id,
          comment: this.Currentcomment,
          date: today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate()
        }
        this.comments = [...this.comments, tempComment]
        this.Currentcomment = ''
      }
      // We will also need to send comment to backend
      e.preventDefault()
    }
  },
  mounted () {
    // HERE WE CAN FETCH POST
    this.isloading = false
    this.currentUserId = 1 // FOr test on production we can fetch from state
    this.Currentpost = {
      title: 'TEST TITLE',
      author: 'Author Organisation',
      description: 'Brief Description about the project Would be great! Client can explain things like anything he want,  this text will content HTML, so We can expect rich text documents., so we might face overflows, for x-axis overflow will be hidden or ill turn on word wrap like haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      contributors_count: 223, // We can fetch this from github repo!
      lang: ['GoLang', 'Python', 'HTML', 'CSS', 'Javascript'],
      social: {
        github: 'http://www.github.com'
      },
      cover_img: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg',
      comments: [
        {

          author: 'User 1',
          author_id: 1,
          comment: 'Nice project!',
          date: '1/22/12' // We can change into date() but for now keep it a string :)

        },
        {
          author: 'User 2',
          author_id: 2,
          comment: 'Can you repair my printer',
          date: '1/22/12'
        },
        {
          author: 'User 3',
          author_id: 3,
          comment: "JIITians don't pm me",
          date: '3/12/25'
        }
      ],
      upAnddown: {
        12: 1,
        1: 0,
        3: 1,
        5: 0
      }
    }
    this.comments = this.Currentpost.comments
  },
  computed: {
    currentUserLikes () {
      if (this.Currentpost.upAnddown[this.currentUserId] === 1) {
        return 'color:black'
      }
      return 'color:white'
    },
    currentUserDisikes () {
      if (this.Currentpost.upAnddown[this.currentUserId] === 0) {
        return 'color:black'
      }
      return 'color:white'
    }
  },
  created () {
    if (this.$store.state.token) {
      // console.log("HI, Looks like you're a developer! Wanna Contribute ? Visit Our Github")
    } else {
      this.$router.push({ path: 'login', query: { error: 'true' } })
    }
  }

}

</script>
<style scoped>
.card-text {
    overflow-x: hidden;
    word-wrap:break-word;
}
.stackList , .stackList > ul {
    display: flex;
    flex-direction: row;
}
.stackList > ul > li {
    list-style: none;
    margin-right: 10px;
}
.GithubBtn {
    margin-top: 10px;
    padding: 10px 30px;
}
a {
    color:white;
}
a:hover {
    color: white;
}
</style>
