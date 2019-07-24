<template>
<div>
    <b-container v-if="isLoading">
        <center><b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner></center>
    </b-container>
    <div class="event-wrapper" v-else>
        <div class="event-heading-wrapper">
            <b-container>
                <div class="event-heading">
                    <h1>{{title}} - {{venue.date}}</h1>
                    <h4><b>Organised By</b> {{organiser}}</h4>
                    <h5><b>Venue -</b> {{venue.location}}</h5>
                </div>
            </b-container>
        </div>
        <div class="event-body-wrapper">
            <b-container>
                <div class="event-body">
                    <div class="event-content">
                        <h2>Description</h2>
                        <hr>
                        <div class="Content">
                            <p v-html="description"></p>
                        </div>
                        <div class="event-img">
                            <img :src="coverImg" alt="A Cover Image">
                        </div>
                        <div class="invitation" v-if="isUserAttending">
                            <b-container>
                                <h4>Are  you attending?</h4>
                            </b-container>
                            <div class="ResponseDiv">
                                <button class="response-btn" @click="attendEvent">Yes</button>
                            </div>
                        </div>
                        <div class="mt-4" v-else>
                            <center><h4>See you at the event! 🎉</h4></center>
                        </div>
                    </div>
                    <div class="event-venue">
                        <h2>Venue</h2>
                        <hr>
                        <div class="detailFlex">
                            <div class="detail-icon">
                                <v-icon>fa-clock</v-icon>
                            </div>
                            <div class="detail-content">
                                <!-- Friday 30th August 2019 -->
                                {{generateDate}}
                            </div>
                        </div>
                        <br>
                        <div class="detailFlex">
                            <div class="detail-icon">
                                <v-icon>fa-map-marker</v-icon>
                            </div>
                             <div class="detail-content">
                                {{venue.location}}
                             </div>
                        </div>
                        <br>
                        <h4>For More information, Contact</h4>
                        <hr>
                        <div class="detailFlex">
                            <div class="detail-icon">
                                <v-icon>fa-phone</v-icon>
                            </div>
                             <div class="detail-content">
                                {{organiserDetails.phone}}
                             </div>
                        </div>
                        <br>
                        <div class="detailFlex">
                            <div class="detail-icon">
                                <v-icon>fa-envelope</v-icon>
                            </div>
                             <div class="detail-content">
                                {{organiserDetails.email}}
                             </div>
                        </div>
                        <div class="map">
                        </div>
                    </div>
                </div>
            </b-container>
        </div>
    </div>
</div>

</template>

<script>
import Authenticate from '@/services/Auth'
export default {
  name: 'Event',
  data () {
    return {
      title: 'EVENT NAME',
      description: '<p>Lorem ipsumdolor sit amet, consectetur adipisicing elit. Temporibus alias voluptatibus pariatur velit consequatur! Blanditiis eligendi vero harum officiis autem sit voluptatem aliquam placeat commodi atque, eaque eveniet voluptates fugiat!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem nihil officia unde fugit! Nobis nihil illo dolores sint quae labore recusandae dolorem vel, blanditiis perspiciatis? Recusandae quisquam dolorum laborum placeat</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat voluptatem cum autem? Ut, sit dolorum. Incidunt, culpa sit. Hic aut voluptatum nobis veritatis architecto eligendi dolore error nesciunt placeat harum.</p>',
      organiserDetails: {
        phone: '123456789',
        email: 'test@gmail.com'
      },
      venue: {
        location: 'XYZ Road, New Delhi',
        date: '12/22/2019',
        time: '12:11:00 pm'
      },
      organiser: 'Test 1',
      coverImg: '',
      attendees: [],
      isLoading: true
    }
  },
  methods: {
    async attendEvent () {
      const resp = await fetch('http://localhost:3000/events/attendEvent', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.$session.get('token')
        },
        body: JSON.stringify({
          id: this.$route.params.id
        })
      })
      const content = await resp.json()
      console.log(content)
      this.attendees.push(this.$session.get('token'))
    }
  },
  async mounted () {
    Authenticate.Authenticate(this)
    const resp = await fetch('http://localhost:3000/events/fetchEvent', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.$session.get('token')
      },
      body: JSON.stringify({
        id: this.$route.params.id
      })
    })
    const content = await resp.json()
    console.log(content)
    this.title = content.event.title
    this.description = content.event.description
    this.organiser = content.event.organiser.name
    this.venue = content.event.venue
    this.coverImg = content.event.coverImg
    this.attendees = content.event.attendees
    this.isLoading = false
    // We'll fetch event details from backend here and put the value in an object
    // don't forget to change isloading to false
  },
  computed: {
    generateDate () {
      var date = new Date(this.venue.date + ' ' + this.venue.time)
      return date
    },
    isUserAttending () {
      if (this.attendees.indexOf(this.$session.get('token')) === -1) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style scoped>
.event-heading > h4, h5{
    font-weight: 200
}
.event-heading-wrapper {
    background-color: rgb(25, 26, 99);
    color: white;
    padding-bottom: 6px;
    position: fixed;
    box-shadow: 0px 3px 8px rgb(10, 11, 44);
    width: 100%;
}
.event-body {
    margin-top: 200px;
    display: grid;
    grid-template-columns: 60% auto;
    grid-gap: 20px;
}
 .event-venue {
    padding:10px;
    max-height:480px;
    border: 1px solid rgba(0,0,0,0.6);
    border-radius: 10px;
}
.event-content {
    padding: 10px;
    border: 1px solid rgba(0,0,0,0.6);
    border-radius: 10px;
}
.ResponseDiv {
    display: flex;
    justify-content: center;
}
.response-btn {
    padding: 8px 40px;
    color: white;
    background-color: grey;

}
.event-img {
    margin: 0 2px;
}
.event-img > img {
    width: 100%;
    max-height: 600px;
}
.detailFlex {
    display: grid;
    grid-template-columns: 10% auto;
    grid-gap: 2px;
}
.map > iframe {
    margin-top: 10px;
    width: 100%;
}
.invitation {
    padding:10px;
}
</style>
