<template>
    <div class="event-form-wrapper">
        <b-container>
            <h1>Create Event</h1>
            <hr>
            <b-form @submit="addEvent" enctype='multipart/form-data'>
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
                    <b-col md="2">
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
                    <b-col md="6">
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
                <div class="Submit">
                  <button class="btn-lg btn-primary btn-primary ">Add Event</button>
                </div>
            </b-form>
        </b-container>
    </div>
</template>

<script>

import { VueEditor } from 'vue2-editor'
export default {
  name: 'EventForm',
  components: {
    VueEditor
  },
  data () {
    return {
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
      const response = await fetch('http://localhost:3000/events/addEvent', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.$session.get('token')
        },
        body: JSON.stringify(body)
      })
      const content = await response.json()
      console.log(content)
    }
  },
  mounted () {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.Submit > button {
  float: right;
}
</style>
