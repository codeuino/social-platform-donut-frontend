<template>
    <v-layout class="shadow-lg myCard"> 
        <div xs12 sm6  class="w-100 ">
            <div v-if="isloading">
                <v-card>
                    <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" type="grow"></b-spinner>
                </v-card>
            </div>
            <v-card v-if="!isloading" class="p-3">
                <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-1"><router-link :to="`/post/${Currentpost.pid}`"><b-navbar-brand >{{Currentpost.card_title}}</b-navbar-brand></router-link>
</h3>
                    <hr>
                    <div class="cardText " v-html="Currentpost.card_text"></div>
                    <div class="my-2 text-right">
                        <router-link class="text-dark" :to="`/profile/${Currentpost.card_author_id}`">{{Currentpost.card_author}}</router-link>
                    </div>
                </div>
                </v-card-title>

                <v-img
                :src="post.card_img"
                aspect-ratio="2.75"
                ></v-img>

                <v-card-actions v-if="!preview" class="mt-3">
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
                    </v-btn><v-btn fab dark small color="blue">
                    <v-icon dark>mdi-share</v-icon>
                    </v-btn>
                    </b-col>
                    
                    </b-row>
                    
                </v-form>
                </v-card-actions>
                <v-container>

                    <b-list-group>
                    <b-list-group-item v-for="(comment, index) in this.comments" :key="index"  class="b-row"><router-link class="text-dark" :to="`/profile/${comment.author_id}`">{{comment.author}}</router-link>
: {{comment.comment}}</b-list-group-item>
                    </b-list-group>
                </v-container>
            </v-card>
        </div>
    </v-layout>
</template>

<script>
export default {
    name:"Post",
    props:{
        post:Object, // This object must have card_title , card_text, [comments {author_id, author, comment}] and card_img ,
        preview:Boolean
    },
    data(){
        return {
            currentUserId:null,
            isloading:true,
            Currentpost: {
            },
            comments:[],
            Currentcomment:''
        }
    },
    methods: {
        toggleVote(e){
            if(e.target.innerHTML=='thumb_up'){
                if(this.Currentpost.upAnddown[this.currentUserId]==1){
                    this.Currentpost.upAnddown[this.currentUserId]=null
                    //Here he undo his/her like, so now value to be null and sends to backend
                }
                else{
                    this.Currentpost.upAnddown[this.currentUserId]=1
                    // He now likes the post and we should send this to backend
                }
            }
            if(e.target.innerHTML=='thumb_down'){
                if(this.Currentpost.upAnddown[this.currentUserId]==0){
                    this.Currentpost.upAnddown[this.currentUserId]=null
                    //Here he undo his/her dislike, so now value to be null or we can just remove user from map and sends to backend
                }
                else{
                    this.Currentpost.upAnddown[this.currentUserId]=0
                    // User now dislikes the post and we should send this to backend
                }
            }
        },
        addComment(e){
           // I will add validation, on making validation module so don't panic 
          if(this.Currentcomment==""){
              alert("Please Add Comment")
              e.preventDefault()
          }else{
          var today = new Date();
          let temp_comment={
          author:this.$store.state.userDetails.name,
          author_id:this.$store.state.userDetails.id,
          comment:this.Currentcomment,
          date: today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate()
          }
          this.comments=[...this.comments,temp_comment]
          this.Currentcomment=''
          }
          // We will also need to send comment to backend
          e.preventDefault();
          
      }  
    },
    mounted() {
        this.comments=this.post.comments
        this.Currentpost=this.post
        this.isloading=false
        this.currentUserId=this.$store.state.userDetails.id
    },
    computed:{
        currentUserLikes(){
            if(this.Currentpost.upAnddown[this.currentUserId]==1){
                return "color:black"
            }
            return "color:white"
        },
        currentUserDisikes(){
            if(this.Currentpost.upAnddown[this.currentUserId]==0){
                return "color:black"  
            }
            return "color:white"
    	}
		}
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');
.cardText{
    word-wrap: break-word;
}
.list-group{
    max-height: 140px;
    overflow-y: scroll;
}
.v-btn:focus {
    outline: none
}
.myCard{
    font-family: 'Lato', sans-serif;
}
.myCard:hover {
    animation: increaseSize 0.6s forwards;
}
@keyframes increaseSize {
    100%{
        transform: scale(1.03)
    }
}
</style>
