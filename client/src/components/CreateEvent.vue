<template>
    <div class="event-form-wrapper">
      <b-row>
        <b-col cols="6">
          <b-container>
            <b-form enctype='multipart/form-data'>
                <b-form-group
                label="Title"
                >
                    <b-form-input
                    placeholder= "Enter titile of the event"
                    v-model="title"
                    required
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                label="Description"
                >
                        <vue-editor id="editor1"  v-model="description" :editorToolbar="customToolbar"></vue-editor>
                </b-form-group>
                <h4>Venue Details</h4>
                <hr>
                <b-row>
                    <b-col md="4">
                        <b-form-group
                        label="Date"
                        >
                        <b-form-input
                        type="date"
                        v-model="date"
                        required
                        >
                        </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="4">
                        <b-form-group
                        label="Time"
                        >
                        <b-form-input
                        type="time"
                        required
                        v-model="time"
                        >
                        </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="4">
                        <place-autocomplete-field v-model="location" placeholder="Enter an an address, zipcode, or location" label="Address" name="field1" api-key="AIzaSyAhSv9zWvisiTXRPRw6K8AE0DCmrRMpQcU"></place-autocomplete-field>
                    </b-col>
                </b-row>
                <h4>Organier's Details</h4>
                <hr>
                <b-row>
                  <b-col md="6">
                    <b-form-group
                    label="Phone Number"
                    >
                      <b-form-input
                      v-model="phone"
                      required
                      placeholder="Write Phone Number"
                      >

                      </b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group
                    label="Email"
                    >
                      <b-form-input
                      type="email"
                      v-model="email"
                      required
                      placeholder="Write Email Address"
                      >

                      </b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-form-group>
                       <b-form-file
                        v-model="coverImg"
                        name='file'
                        :state="Boolean(coverImg)"
                        placeholder="Choose a file..."
                        drop-placeholder="Drop file here..."
                      ></b-form-file>
                    </b-form-group>
            </b-form>
            <div class="Submit">
                  <button @click="addEvent" class="btn-lg btn-primary btn-primary ">Add Event</button>
                  <button @click="Preview" class="btn-lg btn-success ml-3" >Preview</button>

                </div>
        </b-container>
        </b-col>
        <b-col cols="6">
          <b-card>
                    <div class="my-2">
                    <h1>Preview</h1>
                    <br>
                    <Project v-if="showPreview" :post="previewEvent"/>
                    </div>
          </b-card>
        </b-col>
      </b-row>

    </div>
</template>

<script>
import Project from './Project.vue'
import { VueEditor } from 'vue2-editor'
export default {
  name: 'EventForm',
  components: {
    VueEditor,
    Project
  },
  data () {
    return {
      previewEvent: {},
      showPreview: false,
      description: '',
      title: '',
      date: null,
      time: null,
      coverImg: '',
      location: null,
      phone: '',
      email: '',
      customToolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['code-block'],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }]
      ]
    }
  },
  methods: {
    async addEvent (e) {
      e.preventDefault()
      const body = {
        title: this.title,
        location: this.location,
        date: this.date,
        time: this.time,
        description: this.description,
        coverImg: this.coverImg,
        phone: this.phone,
        email: this.email
      }
      const response = await fetch(this.$store.state.BaseURL + '/events/addEvent', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.$session.get('token')
        },
        body: JSON.stringify(body)
      })
      if (response.status === 200) {
        alert('Event created')
      } else {
        alert('Failed to create event')
      }
    },
    Preview (e) {
      e.preventDefault()
      this.showPreview = true
      this.previewEvent = {
        title: this.title,
        venue: {
          location: this.location,
          time: this.time
        },
        date: this.date,
        description: this.description,
        coverImg: this.coverImg,
        phone: this.phone,
        email: this.email,
        organiserDetails: {
          name: 'Preview'
        },
        attendees: ['Preview']
      }
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
.Submit > button {
  float: right;
}
</style>
