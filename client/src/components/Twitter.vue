<template>
  <span @click="twitterLink(url, {title})" id="TwitterBtn">
    <b-button pill variant="primary" class="btn-block">Share on Twitter <v-icon style="color:white;font-size:16px">fab fa-twitter</v-icon></b-button>
  </span>
</template>

<script>
import objectToGetParams from '@/services/objectToGetParams'
import 'vue-awesome/icons/brands/twitter-square'
export default {
  name: 'twitter',
  methods: {
    twitterLink (url, { title }) {
      window.open(
        'https://www.twitter.com/share' +
            objectToGetParams({
              url: url,
              text: title
            }),
        '__blank'
      )
    }
  },
  components: {
  },
  props: {
    url: {
      required: true,
      type: String
    },
    title: {
      required: false,
      type: String
    },
    scale: {
      required: false,
      type: String
    }
  }
}
</script>
<style scoped>

</style>
