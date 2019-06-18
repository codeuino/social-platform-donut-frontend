<template>
  <span @click="facebookLink(url)">
    <b-button class="btn-block" pill variant="info">Share on Facebook <v-icon style="color:white;font-size:16px">fab fa-facebook</v-icon></b-button>
  </span>
</template>

<script>
import objectToGetParams from '@/services/objectToGetParams'
import 'vue-awesome/icons/brands/facebook'
export default {
  name: 'Facebook',
  components: {
  },
  methods: {
    facebookLink (url) {
      window.open(
        `https://www.facebook.com/sharer/sharer.php` +
            objectToGetParams({
              u: url
            }),
        '__blank'
      )
    }
  },
  props: {
    url: {
      required: true,
      type: String
    },
    scale: {
      required: false,
      type: String
    }
  }
}
</script>
