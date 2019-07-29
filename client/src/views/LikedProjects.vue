<template>
    <div>
        <b-jumbotron
        class="bg-info text-white mb-0"
        header="Liked Projects"
        >
        </b-jumbotron>
        <FeedGroup  :postsArray="projects"/>
    </div>
</template>

<script>
import FeedGroup from '@/components/FeedGroup.vue'
export default {
  name: 'LikedProjects',
  components: {
    FeedGroup
  },
  data () {
    return {
      projects: []
    }
  },
  async mounted () {
    const response = await fetch('http://localhost:3000/projects/LikedProjects', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.$session.get('token')
      }
    })
    const content = await response.json()
    this.projects = content.projects
  }
}
</script>

<style scoped>

</style>
