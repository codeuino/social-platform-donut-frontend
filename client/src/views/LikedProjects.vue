<template>
    <div>
        <SideNavigation/>
        <FeedGroup  :postsArray="projects"/>
    </div>
</template>

<script>
import SideNavigation from '@/components/SideNavigation.vue'
import FeedGroup from '@/components/FeedGroup.vue'
export default {
  name: 'LikedProjects',
  components: {
    FeedGroup,
    SideNavigation
  },
  data () {
    return {
      projects: []
    }
  },
  async mounted () {
    const response = await fetch(this.$store.state.BaseURL + '/projects/LikedProjects', {
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
