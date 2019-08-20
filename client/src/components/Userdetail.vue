<template>
    <div class="post-card" >
    <div class="user-detail-wrapper b-container" :class="$store.state.darkMode ? 'dark-mode' : 'light-mode' ">
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
.dark-mode {
  background-color: #1A1A1B;
  color:white;
}
.light-mode {
  background-color:white;
}
.user-detail-wrapper {
  min-height:84vh;
  position: fixed;
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
