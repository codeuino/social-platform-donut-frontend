<template>
    <span @click="CopyToClip">
        <b-button pill variant="light" class="btn-block">Copy to clipboard</b-button>
        <input type="hidden" :value="url" id="myURL">
    </span>
</template>
<script>
export default {
  name: 'CopyLink',
  props: {
    url: {
      required: true,
      type: String
    }
  },
  methods: {
    CopyToClip () {
      var myURL = document.getElementById('myURL')
      myURL.setAttribute('type', 'text')
      myURL.select()
      document.execCommand('copy')
      alert('Link Copied')
      myURL.setAttribute('type', 'hidden')
    }
  }
}
</script>
<style scoped>

</style>
