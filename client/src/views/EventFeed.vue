<template>
    <div class="feed-wrapper">
        <b-container v-if="isLoading">
            <center><b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner></center>
        </b-container>
         <div v-else class="wrapper" :class="$store.state.darkMode ? 'bg-dark' : '' ">
        <SideNavigation/>
        <FeedGroup :postsArray="events"/>
        <Recent/>
    </div>
    </div>
</template>

<script>
import SideNavigation from '@/components/SideNavigation.vue'
import Recent from '@/components/Recent.vue'
import FeedGroup from '@/components/FeedGroup.vue'
export default {
  name: 'EventFeed',
  data () {
    return {
      events: [],
      isLoading: true
    }
  },
  components: {
    SideNavigation,
    Recent,
    FeedGroup
  },
  async mounted () {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    }
    try {
      const resp = await fetch(this.$store.state.BaseURL + '/events/fetchEvents', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.$session.get('token')
        }
      })
      const content = await resp.json()
      if (content.status === 1) {
        this.events = content.events
      } else {
        console.log(content)
      }
    } catch (error) {
      console.log(error)
    }
    this.isLoading = false
  }
}
</script>

<style scoped>
.light {
  background-color: #edf2fb;
}
.wrapper {
  min-height:96vh;
  background-color:#edf2fb;
  padding:10px;
  padding-top: 35px;
  font-family: 'Josefin Sans', sans-serif;

}

</style>
