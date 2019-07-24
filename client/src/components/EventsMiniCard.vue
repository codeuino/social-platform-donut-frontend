<template>
    <div class="event-card">
        <span>{{event.venue.date}}</span>
        <h3>{{event.title}}</h3>
        <h5>By {{event.organiser}}</h5>
        <hr>
        <p>
        <v-icon class="mr-2">fa-map-marker</v-icon> {{event.venue.location}}
        </p>
        <div class="detail-btn ">
        <center>
        <router-link :to="`/events/event/${event._id}`"><button class="text-white">View</button></router-link>

        </center>
    </div>
    </div>
</template>

<script>
export default {
  name: 'EventMiniCard',
  props: {
    event: Object
  }
}
</script>
<style scoped>
.event-card {
    position: relative;
    width: 350px;
    padding: 5px;
    border: 1px solid rgb(175, 30, 30);
    border-radius: 10px;
    min-height: 250px;
    max-height: 250px;
}
.event-card > h5 {
    font-weight: 200;
    font-size: 14px;
}
.event-card > p {
    margin-top: 30px;
}
.detail-btn {
    background-color: rgb(175, 30, 30);
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 20px 0;
    left: 0;
    color:white;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}
.event-card > span {
    color:grey;
    font-weight: 900;
}
</style>
