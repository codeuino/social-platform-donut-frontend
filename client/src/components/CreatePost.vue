<template>
    <div class="wrapper">
      <b-row>
        <b-col cols="6">
          <b-container>
            <b-form >
                <b-form-group
                label="Title"
                >
                <b-form-input
                placeholder= "Enter title"
                v-model="title"
                required
                >
                </b-form-input>
                </b-form-group>
                <b-form-group
                >
                <vue-editor id="editor1"  v-model="content" :editorToolbar="customToolbar"></vue-editor>
                </b-form-group>
                <div class="Submit">
                  <button @click="addPost" class="btn-lg btn-primary mr-4" >Add post</button>
                  <button @click="Preview" class="btn-lg btn-success ml-3" >Preview</button>
                </div>
            </b-form>
          </b-container>
        </b-col>
        <b-col cols="6">
          <b-card>
                    <div class="my-2">
                    <h1>Preview</h1>
                    <br>
                    <Project v-if="showPreview" :post="testPost"/>
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
  name: 'CreateEvent',
  data () {
    return {
      title: '',
      content: '',
      customToolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['code-block'],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }]
      ],
      testPost: {},
      showPreview: false
    }
  },
  components: {
    VueEditor,
    Project
  },
  computed: {
    checkText () {
      return (this.title === '' || this.content === '') // || this.newPost.description === ''
    }
  },
  methods: {
    async addPost (e) {
      e.preventDefault()
      const response = await fetch(this.$store.state.BaseURL + '/posts/add',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.$session.get('token')
          },
          body: JSON.stringify({
            title: this.title,
            content: this.content
          // We'll take author details from JWT ;)
          })
        })
      if (response.status === 200) {
        alert('Post Added')
        this.$bvModal.hide('modal-4')
      } else {
        alert('Failed to add post')
      }
    },
    Preview (e) {
      e.preventDefault()
      this.showPreview = true
      this.testPost = {
        title: this.title,
        content: this.content,
        userName: 'Preview'
      }
    }
  }
}
</script>

<style scoped>
.Submit > button {
  float: right;
}
</style>
