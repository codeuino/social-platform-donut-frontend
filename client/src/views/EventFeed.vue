<template>
    <div class="feed-wrapper">
        <b-container v-if="isLoading">
            <center><b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner></center>
        </b-container>
        <b-container v-else>
            <h1 class="feed-heading">Events for you</h1>
            <hr>
            <router-link :to="`/events/create`"><button class="btn btn-primary btn-lg text-white">Create Event</button></router-link>
            <b-container v-if="events.length===0">
            <center><h5>0 Events</h5></center>
            </b-container>
            <div class="feed-content">
                <EventsMiniCard  v-for="(event, index) in events" v-bind:key="index" :event="event"/>
            </div>
        </b-container>
    </div>
</template>

<script>
import EventsMiniCard from '@/components/EventsMiniCard.vue'
export default {
  name: 'EventFeed',
  data () {
    return {
      events: [],
      isLoading: true
    }
  },
  components: {
    EventsMiniCard
  },
  async mounted () {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    }
    try {
      const resp = await fetch('http://localhost:3000/events/fetchEvents', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.$session.get('token')
        }
      })
      const content = await resp.json()

      this.events = content.events
    } catch (error) {

    }
    this.isLoading = false
  }
}
</script>

<style scoped>
h1 {
    font-size:48px;
}
.feed-content {
    margin-top:50px;
    display: grid;
    grid-template-columns: auto auto auto;
    grid-row-gap: 20px;
}
</style>
