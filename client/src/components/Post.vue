<template>
    <v-layout>
        <div xs12 sm6  class="w-100 ">
            <v-card class="p-3">
                <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-1">{{post.card_title}}</h3>
                    <hr>
                    <div class="cardText "> {{ post.card_text }} </div>
                </div>
                </v-card-title>

                <v-img
                :src="post.card_img"
                aspect-ratio="2.75"
                ></v-img>

                <v-card-actions class="mt-3">
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
                    <v-btn fab dark small color="pink">
                    <v-icon dark>thumb_up</v-icon>
                    </v-btn>
                    <v-btn fab dark small color="pink">
                    <v-icon dark>thumb_down</v-icon>
                    </v-btn><v-btn fab dark small color="blue">
                    <v-icon dark>mdi-share</v-icon>
                    </v-btn>
                    </b-col>
                    
                    </b-row>
                    
                </v-form>
                </v-card-actions>
                <v-container>

                    <b-list-group>
                    <b-list-group-item v-for="(comment, index) in this.comments" :key="index"  class="b-row"><a :href=" `/profile/${comment.author_id}` ">{{comment.author}}</a> : {{comment.comment}}</b-list-group-item>
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
        post:Object,
    },
    data(){
        return {
            comments:[],
            Currentcomment:''
        }
    },
    methods: {
      addComment(e){
           // I will add validation, on making validation module so don't panic :)
          if(this.Currentcomment==""){
              alert("Please Add Comment")
              e.preventDefault()
          }else{
          var today = new Date();
          let temp_comment={
          author:this.$store.state.username,
          author_id:this.$store.state.id,
          comment:this.Currentcomment,
          date: today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate()
          }
          this.comments=[...this.comments,temp_comment]
          this.Currentcomment=''
          }
          
          e.preventDefault();
          
      }  
    },
    mounted() {
        this.comments=this.post.comments
    },
}
</script>

<style scoped>
.cardText{
    word-wrap: break-word;
}
.list-group{
    max-height: 140px;
    overflow-y: scroll;
}
</style>
