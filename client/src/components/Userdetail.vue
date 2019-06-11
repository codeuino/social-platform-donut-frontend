<template>
    <div class="w-100 text-center">
        <b-jumbotron></b-jumbotron>
        <div class="header">
            <img class="profilePic" :src="user.profilePicture" alt="">
            <h3 class="mt-2 ">{{user.name}}</h3>
            <h5 class="lead mt-2">{{user.location.country}}</h5>
            <div v-if="differentPerson" class="mt-3">
                <span v-if="!isUserFollowing"><b-button @click="toggleFollowing" variant="outline-dark">Follow +</b-button></span>
                <span v-if="isUserFollowing"><b-button @click="toggleFollowing" variant="dark">Following</b-button></span>
            </div>
            <div class=" mt-3">
                <p>
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
                </b-col>
                 </b-row>
        
            
        </div>                  
    </div>
</template>

<script>
export default {
    name:"UserDetail",
    props: {
        user:Object,
    },
    data () {
        return {
            Userfollowing:false
        }
    },
    methods: {
        toggleFollowing() {
            //Emit so Parent Component can manipulate it ;D
            if(this.Userfollowing) {
                this.$emit('FollowerIncoming',0) // Decrease Follower List and remove the currentUSer
                this.Userfollowing= !this.Userfollowing
            }
            else{
                this.$emit('FollowerIncoming',1) // Decrease Follower List and remove the currentUSer
                this.Userfollowing= !this.Userfollowing

            }
        }
    },
    computed:{
        followingCount() {
            return this.user.followings.length
        },
        followerCount() {
            return this.user.followers.length
        },
        differentPerson() {
            return this.$route.params.id!=this.user.id
        },
        isUserFollowing() {
            return this.Userfollowing
        }
    }
}
</script>

<style scoped>
.profilePic {
    height:200px;
    width:200px;
    border: 1px solid transparent;
    border-radius: 50%;
    
}
.header{
    position: relative;
    top:-90px;
    margin-bottom: -80px;
}
.followStats > div {
    display: inline-block;
    margin-left: 20px;
    margin-top: -3px;
}
#social-links > div {
    display: inline-block;
    margin-left: 20px;
    margin-top: -3px;

}
.jumbotron {
    min-height: 100px;
}

#social-links {
    text-align: left;
}
@media (max-width: 780px){
    #social-links {
        text-align: center !important;
    }
}


</style>
