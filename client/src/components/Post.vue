<template>
    <div>
    <v-layout class="shadow-lg myCard">
        <div xs12 sm6  class="w-100 ">
            <div v-if="isloading">
                <v-card>
                    <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" type="grow"></b-spinner>
                </v-card>
            </div>
            <v-card v-if="!isloading" :class="$store.state.darkMode ? 'bg-dark p-3 text-white' : 'p-3' ">
                <v-card-title primary-title>
                <div>
                    <h2 class="headline mb-1"><router-link :to="`/post/${Currentpost.pid}`" ><b-navbar-brand  style="font-size:28px;">{{Currentpost.card_title}}</b-navbar-brand></router-link></h2>
                    <hr>
                    <div class="cardText " v-html="Currentpost.card_text"></div>
                    <div class="my-2 text-right">
                        <router-link  :to="`/profile/${Currentpost.card_author_id}`">{{Currentpost.card_author}}</router-link>
                    </div>
                </div>
                </v-card-title>

                <v-img
                :src="post.card_img"
                aspect-ratio="2.75"
                ></v-img>

            </v-card>
        </div>
    </v-layout>
    </div>

</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Post',
  components: {
  },
  props: {
    post: Object, // This object must have card_title , card_text, [comments {author_id, author, comment}] and card_img ,
    preview: Boolean
  },
  data () {
    return {
      currentUserId: null,
      isloading: true,
      Currentpost: {
      },
      Currentcomment: ''
    }
  },
  methods: {
    ...mapActions({
      addPostID: 'addPostID'
    }),
    SETID () {
      this.addPostID(this.post.pid)
    }
  },
  mounted () {
    this.Currentpost = this.post
    this.isloading = false
    this.currentUserId = this.$store.state.userDetails.id
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
    font-size: 15px;
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
