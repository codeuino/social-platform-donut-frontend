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
        <b-card v-if="!isloading" class="singlePost" >
            <b-card-title class="title">{{Currentpost.title}}</b-card-title>
            <p>{{Currentpost.authorName}}</p>
            <hr>
            <b-card-text v-html="Currentpost.content" />
            <b-card-text  class="stackList">
                <b>Technologies Used: </b>
                <ul>
                    <li :key="index" v-for="(lang, index) in Currentpost.lang">{{lang}}</li>
                </ul>
            </b-card-text>
            <b-card-text class="text-center">
                <img :src="Currentpost.cover_img" alt="">

            </b-card-text>
            <b-card-text>
                <!-- <div class="GithubBtn btn btn-lg btn-primary">
                    <a :href="Currentpost.social.github">View On Github <v-icon style="font-size:16px;margin-bottom:2px;margin-left:2px;color:white">fab fa-github</v-icon></a>
                </div> -->
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
                    <v-icon dark :class="{'black': isThumbsUpActive}" @click="toggleVote">thumb_up</v-icon>
                    </v-btn>

                    <v-btn fab dark small color="pink">
                    <v-icon dark :class="{'black': isThumbsDownActive}" @click="toggleVote">thumb_down</v-icon>
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
import uuid from 'uuid'
import SocialMedia from '@/components/SocialMedia.vue'
export default {
  name: 'singlePost',
  components: {
    SocialMedia
  },
  data () {
    return {
      isThumbsUpActive: false,
      isThumbsDownActive: false,
      currentUserId: null,
      isloading: true,
      Currentpost: {
      },
      comments: [],
      Currentcomment: ''
    }
  },
  methods: {
    async toggleVote (e) {
      if (e.target.innerHTML === 'thumb_up') {
        if (this.Currentpost.upAnddown[this.currentUserId] === '1') {
          this.Currentpost.upAnddown[this.currentUserId] = '0'
          this.isThumbsUpActive = false
          this.isThumbsDownActive = false
          // Here he undo his/her like, so now value to be null and sends to backend
          const resp = await fetch('http://localhost:3000/projects/addVote', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': this.$session.get('token')
            },
            body: JSON.stringify({
              id: this.$route.params.post_id,
              vote: '0'
            })
          })
          const content = await resp.json()
          console.log(content)
          console.log(this.Currentpost.upAnddown[this.currentUserId])
        } else {
          this.Currentpost.upAnddown[this.currentUserId] = '1'
          this.isThumbsUpActive = true
          this.isThumbsDownActive = false
          // He now likes the post and we should send this to backend
          const resp = await fetch('http://localhost:3000/projects/addVote', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': this.$session.get('token')
            },
            body: JSON.stringify({
              id: this.$route.params.post_id,
              vote: '1'
            })
          })
          const content = await resp.json()
          console.log(content)
          console.log(this.Currentpost.upAnddown[this.currentUserId])
        }
      }
      if (e.target.innerHTML === 'thumb_down') {
        if (this.Currentpost.upAnddown[this.currentUserId] === '-1') {
          this.Currentpost.upAnddown[this.currentUserId] = '0'
          this.isThumbsUpActive = false
          this.isThumbsDownActive = false
          // Here he undo his/her dislike, so now value to be null or we can just remove user from map and sends to backend
          const resp = await fetch('http://localhost:3000/projects/addVote', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': this.$session.get('token')
            },
            body: JSON.stringify({
              id: this.$route.params.post_id,
              vote: '0'
            })
          })
          const content = await resp.json()
          console.log(content)
          console.log(this.Currentpost.upAnddown[this.currentUserId])
        } else {
          this.Currentpost.upAnddown[this.currentUserId] = '-1'
          // User now dislikes the post and we should send this to
          this.isThumbsUpActive = false
          this.isThumbsDownActive = true
          const resp = await fetch(this.$store.state.BaseURL + '/projects/addVote', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': this.$session.get('token')
            },
            body: JSON.stringify({
              id: this.$route.params.post_id,
              vote: '-1'
            })
          })
          const content = await resp.json()
          console.log(content)
          console.log(this.Currentpost.upAnddown[this.currentUserId])
        }
      }
    },
    SETID () {
      this.addPostID(this.post.pid)
    },
    async addComment (e) {
      e.preventDefault()
      // I will add validation, on making validation module so don't pan
      if (this.Currentcomment === '') {
        alert('Please Add Comment')
        e.preventDefault()
      } else {
        var today = new Date()
        let tempComment = {
          author: this.$session.get('User'), // this.$store.state.userDetails.name,
          author_id: this.$session.get('UserID'), // this.$store.state.userDetails.id,
          comment: this.Currentcomment,
          date: today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate(),
          uuid: uuid.v4()
        }
        const resp = await fetch(this.$store.state.BaseURL + '/projects/addComment', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.$session.get('token')
          },
          body: JSON.stringify({
            comment: this.Currentcomment,
            uuid: tempComment.uuid,
            id: this.$route.params.post_id

          })
        })
        const content = await resp.json()
        console.log(content)

        this.comments = [...this.comments, tempComment]
        this.Currentcomment = ''
      }
      // We will also need to send comment to backend
    }
  },
  async mounted () {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    }
    const response = await fetch(this.$store.state.BaseURL + '/projects/fetchProject',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.$session.get('token')
        },
        body: JSON.stringify({ id: this.$route.params.post_id })
      })
    const content = await response.json()
    console.log(content)
    this.Currentpost.title = content.project.pname
    this.Currentpost.content = content.project.content
    this.Currentpost.lang = content.project.Lang
    this.Currentpost.comments = content.project.comments
    this.Currentpost.authorName = content.project.authorName
    // eslint-disable-next-line no-unused-expressions
    this.Currentpost.upAnddown = content.project.upDownVote
    this.comments = this.Currentpost.comments
    // this.Currentpost.social.github = content.project.github
    this.isloading = false
  }

}

</script>
<style scoped>
.title {
  font-weight:600;
  color:#618abb;
}
.singlePost {
  border-radius: 10px;
}
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
.black {
  color:black
}
</style>
