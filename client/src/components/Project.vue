<template>
    <div>
      <div v-if="post.pname" class="post-card" :class="$store.state.darkMode ? 'content-dark' : 'content-light' ">
              <div class="lead float-right pr-3 pt-3 post-tag">Project</div>
              <div class="post-header">
                <img src="https://image.flaticon.com/icons/svg/17/17004.svg" alt="">
                <h3>{{post.authorName}}</h3>
              </div>
              <div class="post-title">
                <router-link :to="`/project/${post._id}`"><h4>{{post.pname}}</h4></router-link>
              </div>
              <p class="post-description">{{post.description}}</p>
              <div class="post-img">
                <img :src="post.image" alt="">
              </div>
              <div class="userResp">
                <div class="row mb-4 user-btn">
                  <i class="fas fa-thumbs-up col-2 pt-2" :class="{'Blue': isThumbsUpActive}" @click="toggleVote"></i>
                  <i class="fas fa-thumbs-down col-2 pt-2" :class="{'Blue': isThumbsDownActive}" @click="toggleVote"></i>
                  <i class="fas fa-share pt-2 col-2"></i>
                </div>
                <div class="comment-container">
                  <form @submit="addComment">
                      <input type="text" class="form-control comment" placeholder="Add Comment" v-model="Currentcomment" @submit="addComment">
                  </form>
                </div>
              </div>
      </div>
      <!-- Event Card -->
      <div v-else-if="post.attendees" class="post-card" :class="$store.state.darkMode ? 'content-dark' : 'content-light' ">
              <div class="lead float-right pr-3 pt-3 post-tag">
                Event
              </div>
              <div class="post-header">
                <img src="https://image.flaticon.com/icons/svg/17/17004.svg" alt=""/>
                <h3>{{post.organiserDetails.name}}</h3>
              </div>
              <div class="post-title">
                <router-link :to="`/events/event/${post._id}`"><h4>{{post.title}}</h4></router-link>
              <p><u>Venue and date:</u> {{venue}}</p>
              </div>
              <div class="post-img">
                <img :src="post.coverImg" alt="">
              </div>
      </div>
      <!-- Post Card -->
      <div v-else class="post-card" :class="$store.state.darkMode ? 'content-dark' : 'content-light' ">
              <div class="post-header">
                <img src="https://image.flaticon.com/icons/svg/17/17004.svg" alt="">
                <h3>{{post.userName}}</h3>
              </div>
              <div class="post-title">
                <h4>{{post.title}}</h4>
              </div>
              <div class="post-content" v-html="post.content" ></div>
              <div class="post-img">
              </div>
              <div class="userResp">
                <div class="row mb-4 user-btn">
                  <i class="fas fa-thumbs-up col-2 pt-2" :class="{'Blue': isThumbsUpActive}" @click="toggleVote"></i>
                  <i class="fas fa-thumbs-down col-2 pt-2" :class="{'Blue': isThumbsDownActive}" @click="toggleVote"></i>
                  <i class="fas fa-share pt-2 col-2"></i>
                </div>
                <div class="comment-container">
                  <form @submit="addComment">
                      <input type="text" class="form-control comment" placeholder="Add Comment" v-model="Currentcomment" @submit="addComment">
                  </form>
                </div>
              </div>
      </div>
    </div>

</template>

<script>
import uuid from 'uuid'
import { mapActions } from 'vuex'
export default {
  name: 'Project',
  components: {
  },
  props: {
    post: Object // This object must have card_title , card_text, [comments {author_id, author, comment}] and card_img ,
  },
  data () {
    return {
      isThumbsUpActive: false,
      isThumbsDownActive: false,
      currentUserId: null,
      isloading: true,
      Currentpost: {
      },
      Currentcomment: ''
    }
  },
  computed: {
    venue () {
      var temp = this.post.venue.location
      temp = temp.split(',')
      temp = temp[temp.length - 4] + ', ' + temp[temp.length - 3]
      return temp + ' and ' + this.post.venue.time
    }
  },
  methods: {
    ...mapActions({
      addPostID: 'addPostID'
    }),
    SETID () {
      this.addPostID(this.post.pid)
    },
    async toggleVote (e) {
      var classList = e.target.className.split(' ')

      if (classList.includes('fa-thumbs-up')) {
        console.log(this.Currentpost.upDownVote[this.currentUserId])
        if (this.Currentpost.upDownVote[this.currentUserId] === '1') {
          this.Currentpost.upDownVote[this.currentUserId] = '0'
          this.isThumbsUpActive = false
          this.isThumbsDownActive = false
          // Here he undo his/her like, so now value to be null and sends to backend
          const resp = await fetch(this.$store.state.BaseURL + '/projects/addVote', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': this.$session.get('token')
            },
            body: JSON.stringify({
              id: this.Currentpost._id,
              vote: '0'
            })
          })
          if (resp.status !== 200) {
            alert('Sorry, you cannot vote right now, please try later')
          }
        } else {
          this.Currentpost.upDownVote[this.currentUserId] = '1'
          this.isThumbsUpActive = true
          this.isThumbsDownActive = false
          // He now likes the post and we should send this to backend
          const resp = await fetch(this.$store.state.BaseURL + '/projects/addVote', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': this.$session.get('token')
            },
            body: JSON.stringify({
              id: this.Currentpost._id,
              vote: '1'
            })
          })
          if (resp.status !== 200) {
            alert('Sorry, you cannot vote right now, please try later')
          }
        }
      }
      if (classList.includes('fa-thumbs-down')) {
        if (this.Currentpost.upDownVote[this.currentUserId] === '-1') {
          this.Currentpost.upDownVote[this.currentUserId] = '0'
          this.isThumbsUpActive = false
          this.isThumbsDownActive = false
          // Here he undo his/her dislike, so now value to be null or we can just remove user from map and sends to backend
          const resp = await fetch(this.$store.state.BaseURL + '/projects/addVote', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': this.$session.get('token')
            },
            body: JSON.stringify({
              id: this.Currentpost._id,
              vote: '0'
            })
          })
          if (resp.status !== 200) {
            alert('Sorry, you cannot vote right now, please try later')
          }
        } else {
          this.Currentpost.upDownVote[this.currentUserId] = '-1'
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
              id: this.Currentpost._id,
              vote: '-1'
            })
          })
          if (resp.status !== 200) {
            alert('Sorry, you cannot vote right now, please try later')
          }
        }
      }
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
            id: this.Currentpost._id

          })
        })
        if (resp.status === 200) {
          const content = await resp.json()
          console.log(content)
          alert('Comment Added')
          this.Currentcomment = ''
        } else {
          alert('Failed to add comment')
        }
      }
    }
  },
  mounted () {
    this.Currentpost = this.post
    this.isloading = false
    this.currentUserId = this.$session.get('UserID')
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
.Blue {
  color: blue;

}
.post-header {
  padding:40px 30px 10px 30px;
  margin-bottom:20px;
  display: flex;
  flex-direction: row;

}
.post-header > img {
  height:50px;
  opacity: 0.7;
}
.post-header > h3 {
  font-size:18px;
  font-weight:600;
  color:#618abb;
  opacity: 1;
  margin-left: 15px;
  padding-top: 18px;
}
.post-card {
  height:auto;
  min-height:300px;
  margin-bottom:10px;
  break-inside: avoid;
  border-radius: 5px;
  font-family: 'Josefin Sans', sans-serif
}
.post-tag {
  opacity:0.5;
  font-size:14px;
}
.post-card > p {
  padding:0 30px 0 30px;
  font-size:16px;
  font-weight:500;
  text-align:justify;
  color: #aab4c2;
  word-break: break-all;
}
.post-img > img {
  width:100%;
  margin-bottom:20px;
  opacity:1;
}
.comment {
  border-radius:8px;
}
.comment-container {
  padding:5px 30px 20px 30px;
}
.userResp {
  opacity:0.7;

}
.user-btn {
  margin-left:1px;
  padding:0px 30px;
}
.userResp > div > i {
  cursor: pointer;
}
.post-title {
  margin-top: 30px;
  margin-left: 30px;
  color:#618abb;
}
.post-content {
  word-break: break-all;
  padding:0 30px 0 30px;
  font-size:16px;
  font-weight:500;
  text-align:justify;
  color: #aab4c2;
}
.post-description {
    word-break: break-alll;

}
.post-title > a>  h4 {
  font-size: 20px;
}
</style>
