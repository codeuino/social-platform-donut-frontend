<template>
    <div>
            <b-row>
                <b-col cols="6" class="editor">
                    <div>
                        <b-card>
                            <b-card-header>
                                <b-form-input size="lg"
                                v-model="newPost.card_title"
                                type="text"
                                required
                                placeholder="Enter Title"
                                ></b-form-input>
                            </b-card-header>
                            <br>
                            <vue-editor id="editor"  v-model="newPost.content" :editorToolbar="customToolbar"></vue-editor>
                            <br>
                            <b-form-group>
                              <b-form-input
                              v-model="newPost.description"
                              placeholder="Small description"
                              >

                              </b-form-input>
                            </b-form-group>
                            <b-form-group>
                              <b-form-input
                              v-model="newPost.github"
                              placeholder="Github Link"
                              >

                              </b-form-input>
                            </b-form-group>
                            <b-form-group>
                              <label class="typo__label">Choose Languages</label>
                              <multiselect v-model="newPost.Lang" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick some" :preselect-first="true">
                                <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="newPost.Lang.length &amp;&amp; !isOpen">{{ newPost.Lang.length }} options selected</span></template>
                              </multiselect>
                            </b-form-group>
                            <b-card-footer class="bg-light text-white mt-2">
                                <b-row >
                                    <b-col cols="6">
                                          <b-form-file v-model="image" class="mt-1" plain></b-form-file>
                                    </b-col>
                                    <b-col cols="6">
                                        <button  @click="reset" class="btn btn-danger mr-1">Reset</button>
                                        <button :disabled="checkText" @click="makePreviewPost" class="btn btn-success mr-1">Preview</button>
                                        <button :disabled="checkText" @click="addPost" class="btn btn-primary">Submit</button>
                                    </b-col>
                                </b-row>
                            </b-card-footer>
                        </b-card>
                    </div>
                </b-col>
                <b-col cols="6">
                    <b-card>
                    <div class="my-2">
                    <h1>Preview</h1>
                    <br>
                    <Post v-if="showPreview" v-bind:preview="true" :post="test"/>
                    </div>
                    </b-card>
                </b-col>
            </b-row>
            <div>

            </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { VueEditor } from 'vue2-editor'
import Post from './Post.vue'
export default {
  name: 'CreatePost',
  components: {
    Post,
    VueEditor,
    Multiselect
  },
  data () {
    return {
      options: [
        'Vue.JS', 'Node.JS', 'React.JS', 'Python', 'PHP'
      ],
      image: '',
      newPost: {
        card_title: '', // So changes can only be seen on clicking preview
        content: '',
        github: '',
        card_author: this.$session.get('User'),
        card_author_id: this.$session.get('UserID'),
        card_image: '',
        Lang: [],
        description: ''
      },
      customToolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['code-block'],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }]

      ],
      showPreview: true, // This variable is imp, have a look in Post module doc to understand
      test: { // This object goes to Post module, we can't send newPost directly to Post module cause first we need to render the file send via form using Reader()
        pname: '',
        card_text: '',
        card_img: '',
        card_author: this.$session.get('User'),
        card_author_id: this.$session.get('UserID'),
        description: ''
      }
    }
  },
  computed: {
    checkText () {
      return (this.newPost.card_title === '' || this.newPost.content === '') // || this.newPost.description === ''
    }
  },
  methods: {
    makePreviewPost () {
      this.test.card_text = this.newPost.content
      this.test.pname = this.newPost.card_title
      this.test.description = this.newPost.description
      var reader = new FileReader()
      if (this.image) {
        reader.readAsDataURL(this.image)
        reader.addEventListener('loadend', () => {
          this.test.card_img = reader.result
          this.newPost.card_image = reader.result
        }, false)
      }
    },
    reset () {
      this.newPost.card_title = ''
      this.newPost.content = ''
      this.test.pname = ''
      this.test.card_text = ''
      this.test.card_img = ''
      this.test.description = ''
    },
    async addPost () {
      console.log(this.$session.get('token'))
      // Here we will send to backend
      console.log(this.newPost)
      const response = await fetch('http://localhost:3000/projects/addProject',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.$session.get('token')
          },
          body: JSON.stringify({
            card_title: this.newPost.card_title,
            description: this.newPost.description,
            card_text: this.newPost.content,
            Lang: this.newPost.Lang,
            image: this.newPost.card_img,
            github: this.newPost.github
          // We'll take author details from JWT ;)
          })
        })
      const content = await response.json()
      console.log(content)
      location.reload()
    }
  }
}
</script>

<style scoped>
.editor {
  max-width: 50%;
}
</style>
