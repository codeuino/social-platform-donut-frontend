<template>
    <div>
    <h1>
        This is Search Results
    </h1>
    <SocialMedia/>
    <News/>
    </div>
</template>
<script>
import News from '@/components/Newsletter.vue'
import SocialMedia from '@/components/SocialMedia.vue'

export default {
  name: 'Search',
  components: {
    News,
    SocialMedia
  }

}
</script>
