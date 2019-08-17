<template>
    <!--- <div class="userDetail-wrapper w-100 text-center text-white" :class="$store.state.darkMode ? 'bg-dark' : 'bg-info'">
        <b-jumbotron :class="$store.state.darkMode ? 'dark' : ''"></b-jumbotron>
        <div class="header">
            <img class="profilePic" :src="user.profilePicture" alt="">
            <h3 class="mt-2 ">{{user.name}}</h3>
            <h5 class="lead mt-2"><v-icon class="text-white">mdi-map</v-icon> {{user.location.country}}</h5>
            <div v-if="differentPerson" class="mt-3">
                <span v-if="!isUserFollowing"><b-button @click="toggleFollowing" variant="outline-dark">Follow +</b-button></span>
                <span v-if="isUserFollowing"><b-button @click="toggleFollowing" variant="dark">Following</b-button></span>
            </div>
            <div class=" mt-3">
                <p class="bio">
                    {{user.bio}}
                </p>
            </div>

            <hr>
        </div>
        <div>
                <b-row>
                <b-col class="followStats " md="7">
                    <div ><b>Followers</b><br> {{followerCount}} </div>
                    <div><b>Following</b><br> {{followingCount}} </div>
                </b-col>
                <b-col md="5"  id="social-links">
                    <div><a :href="user.social.facebook"><button class="btn btn-primary">Facebook</button></a></div>
                    <div><a :href="user.social.github"><button class="btn btn-success">Github</button></a></div>
                    <div><a :href="user.social.twitter"><button class="btn btn-dark">Twitter</button></a></div>
                    <div><a :href="user.website"><button class="btn btn-light">Website</button></a></div>
                    <div> <router-link class="btn btn-danger" :to="`/portfolio/${user.id}`">View Portfolio</router-link></div>
                </b-col>
                 </b-row>

        </div>
    </div> --->
    <div class="user-detail-wrapper b-container">
      <div class="row profile-wrapper">
        <div class="profile-img col-4">
          <img src="https://image.flaticon.com/icons/svg/17/17004.svg" alt="">
        </div>
        <div class="col-8 profile-detail pt-4">
          <h4>{{user.name}}</h4>
          <p class="lead">{{user.location.city}}, {{user.location.country}}</p>
        </div>
      </div>
      <div class="bio-wrapper">
          <h5>Bio</h5>
          <hr>
          <p class="bio" >{{user.bio}}</p>
      </div>
      <div class="row stats">
            <div class="col-6 lead"><b>Followers</b> {{followerCount}} </div>
            <div class="col-6 lead"><b>Following</b> {{followingCount}} </div>
      </div>
      <hr>
      <center>
        <div v-if="differentPerson" class="mt-3">
                <span v-if="!isUserFollowing"><b-button @click="toggleFollowing" variant="outline-dark">Follow +</b-button></span>
                <span v-if="isUserFollowing"><b-button @click="toggleFollowing" variant="dark">Following</b-button></span>
        </div>
      </center>

      <hr>
      <div class="userLinks">
        <button class="btn linkedin" >LinkedIn</button>
        <button class="btn ml-2 btn-primary">Facebook</button>
        <button class="btn ml-2 btn-dark">Github</button>
        <button class="btn ml-2 btn-danger">Google</button>

      </div>

    </div>

</template>

<script>
export default {
  name: 'UserDetail',
  props: {
    user: Object
  },
  data () {
    return {
      Userfollowing: false
    }
  },
  methods: {
    toggleFollowing () {
      // Emit so Parent Component can manipulate it ;D
      if (this.Userfollowing) {
        this.$emit('FollowerIncoming', 0) // Decrease Follower List and remove the currentUSer
        this.Userfollowing = !this.Userfollowing
      } else {
        this.$emit('FollowerIncoming', 1) // Decrease Follower List and remove the currentUSer
        this.Userfollowing = !this.Userfollowing
      }
    }
  },
  computed: {
    followingCount () {
      return this.user.followingList.length
    },
    followerCount () {
      return this.user.followersList.length
    },
    differentPerson () {
      return this.$route.params.id !== this.user.id
    },
    isUserFollowing () {
      return this.Userfollowing
    }
  }
}
</script>

<style scoped>
.user-detail-wrapper {
  min-height:84vh;
  position: fixed;
  background-color:white;
  border-radius: 5px;
  min-width:27vw;
  max-width:27vw;
  top:100px;
  margin-left:7vw;
  padding: 30px;
  padding-top:40px;

}
.profile-img > img {
  height:100px;
}
.profile-detail > p {
  font-size:14px;
  opacity: 0.7;
}
.profile-wrapper {
  background-color: #edf2fb;
  padding:  20px 0;
  border-radius: 10px;
}
.bio-wrapper {
  margin-top:40px;
}
.bio-wrapper > p {
  word-break: break-all;
}
.bio {
  line-height: 2;
  text-align: justify;
  opacity:0.6;
}
.stats > div > b {
  opacity: 0.6;
  margin-right: 10px;
}
.userLinks > button {
  display: block;
  width: 100px;
}
.userLinks {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.linkedin {
  background-color: rgb(13, 13, 172);
  color:white;
}
.linkedin:hover{
  color:white;
  background-color: rgb(4, 4, 122);
}
</style>
