<template>
    <div>
        <b-card>
            <b-card-title>
                Share this project
            </b-card-title>
            <div>
                <Twitter :url="shareURL"/>
                <br>
                <Facebook  :url="shareURL"/>
                <br>
                <CopyLink  :url="shareURL"/>
            </div>
        </b-card>

    </div>
</template>

<script>
import Facebook from '@/components/Facebook.vue'
import Twitter from '@/components/Twitter.vue'
import CopyLink from '@/components/CopyLink.vue'
export default {
  name: 'SocialMedia',

  components: {
    Facebook,
    Twitter,
    CopyLink
  },
  props: {
    currentID: String
  },
  computed: {
    shareURL () {
      return this.$router.base + `project/${this.currentID}`
    }
  }
}
</script>

<style scoped>

</style>
