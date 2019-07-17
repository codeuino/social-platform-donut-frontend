<template>
    <div class="event-form-wrapper">
        <b-container>
            <h1>Create Event</h1>
            <hr>
            <b-form @submit="addEvent">
                <b-form-group
                label="Title"
                >
                    <b-form-input
                    placeholder= "Enter titile of the event"
                    v-model="title"
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
                      v-model="organiser.phone"
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
                      v-model="organiser.email"
                      placeholder="Write Email Address"
                      >

                      </b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
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
      location: null,
      organiser: {
        phone: '',
        email: ''
      },
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
    addEvent (e) {
      console.log(this.description, this.title, this.date, this.time, this.location)
      e.preventDefault()
    }
  }
}
</script>

<style scoped>
.Submit > button {
  float: right;
}
</style>
