<template>
    <div>
        <b-jumbotron bg-variant="info" header="Portfolio Setup" class="text-white">
        </b-jumbotron>
        <b-container>
          <b-card>
            <b-card-title>Start a portfolio</b-card-title>
            <b-card-text>
              Follow along the setup , and try to fill all the details carefully.
              </b-card-text>
              <hr>
              <b-form @submit="SetupPortfolio">
                <div>
                  <b-card-title>Landing Page Setup</b-card-title>
                  <b-card-text>
                  <b-form-group
                  label="Organisation Name"
                  >
                  <b-form-input
                  placeholder="Organisation Name"
                  v-model="Portfolio.LandingPage.title"
                  required
                  >
                  </b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="Tagline"
                    >
                    <b-form-input
                      placeholder="You need a Tagline"
                      v-model="Portfolio.LandingPage.tagline"
                      requried
                    >

                    </b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="Cover Photo"
                  >
                    <b-form-input
                      placeholder="You need a Tagline"
                      v-model="Portfolio.LandingPage.tagline"
                      requried
                    >

                    </b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="Cover Image"
                    description="Make sure the width of image is atleast 1064px and height atleast 980px. "
                  >
                    <b-form-file
                    v-model="Portfolio.LandingPage.coverImg"
                    :state="Boolean(Portfolio.LandingPage.coverImg)"
                    placeholder="Choose a file..."
                    drop-placeholder="Drop file here..."
                    ></b-form-file>
                    <div class="mt-3">Selected file: {{ Portfolio.LandingPage.coverImg ? Portfolio.LandingPage.coverImg.name : '' }}</div>
                  </b-form-group>
                  <b-form-group
                    label="Facebook Page"
                    required
                  >
                  <b-form-input
                      placeholder="Facebook Page URL"
                      v-model="Portfolio.LandingPage.social.facebook"
                      requried
                    >

                  </b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="Github Link"
                    required
                  >
                  <b-form-input
                      placeholder="Github Page URL"
                      v-model="Portfolio.LandingPage.social.github"
                      requried
                    >

                  </b-form-input>
                  </b-form-group>
              </b-card-text>
              </div>
              <div>
                <b-card-title>About Screen Setup</b-card-title>
                <b-card-text>
                <h5 class="lead" style="text-decoration:underline">We need three pictures of your organuisation</h5>
                  <b-form-group
                    label="Image 1"
                    description="Make sure the dimensions of image be atleast 300*300"
                  >
                    <b-form-file
                    v-model="Portfolio.AboutScreen.images[0]"
                    :state="Boolean(Portfolio.AboutScreen.images[0])"
                    placeholder="Choose a file..."
                    drop-placeholder="Drop file here..."
                    ></b-form-file>
                    <div class="mt-3">Selected file: {{ Portfolio.AboutScreen.images[0] ? Portfolio.AboutScreen.images[0] : '' }}</div>
                  </b-form-group>
                  <b-form-group
                    label="Image 2"
                    description="Make sure the dimensions of image be atleast 300*300"
                  >
                    <b-form-file
                    v-model="Portfolio.AboutScreen.images[1]"
                    :state="Boolean(Portfolio.AboutScreen.images[1])"
                    placeholder="Choose a file..."
                    drop-placeholder="Drop file here..."
                    ></b-form-file>
                    <div class="mt-3">Selected file: {{ Portfolio.AboutScreen.images[1] ? Portfolio.AboutScreen.images[1] : '' }}</div>
                  </b-form-group>
                  <b-form-group
                    label="Image 3"
                    description="Make sure the dimensions of image be atleast 300*300"
                  >
                    <b-form-file
                    v-model="Portfolio.AboutScreen.images[2]"
                    :state="Boolean(Portfolio.AboutScreen.images[2])"
                    placeholder="Choose a file..."
                    drop-placeholder="Drop file here..."
                    ></b-form-file>
                    <div class="mt-3">Selected file: {{ Portfolio.AboutScreen.images[2] ? Portfolio.AboutScreen.images[2] : '' }}</div>
                  </b-form-group>
                  <b-form-group
                  label="Few words about your organisation, will work fine."
                  >
                    <vue-editor id="editor1"  v-model="Portfolio.AboutScreen.description" :editorToolbar="customToolbar"> </vue-editor>
                  </b-form-group>
              </b-card-text>
              </div>

              <div>
                <b-card-title>About Admin</b-card-title>
                <b-card-text>
                  <b-form-group
                  label="Admin's Name"
                  >
                    <b-form-input
                    placeholder="Person who runs this account"
                    type="text"
                    required
                    v-model="Portfolio.AboutAdmin.name"
                    >

                    </b-form-input>
                  </b-form-group>
                  <b-form-group
                  label="Picture of the admin"
                  >
                    <b-form-file
                    v-model="Portfolio.AboutAdmin.profilePic"
                    :state="Boolean(Portfolio.AboutAdmin.profilePic)"
                    placeholder="Choose a file..."
                    drop-placeholder="Drop file here..."
                    ></b-form-file>
                  </b-form-group>
                  <b-form-group
                  label="Admin's github account"
                  >
                    <b-form-input
                    placeholder="Github Website URL"
                    type="text"
                    required
                    >
                    </b-form-input>
                  </b-form-group>
                  <b-form-group
                  label="Admin's website"
                  >
                    <b-form-input
                    placeholder="Github Website URL"
                    type="text"
                    required
                    >
                    </b-form-input>
                  </b-form-group>
                  <b-form-group
                  label="About Admin"
                  >
                    <vue-editor id="editor2"  v-model="Portfolio.AboutAdmin.about" :editorToolbar="customToolbar"> </vue-editor>
                  </b-form-group>
                </b-card-text>
              </div>
              <b-form-group>
                    <b-button type="submit" btn-block variant="primary">Setup your Portfolio</b-button>
              </b-form-group>
            </b-form>

          </b-card>
        </b-container>
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  name: 'PortfolioStarterForm',
  components: {
    VueEditor
  },
  data () {
    return {
      Portfolio: {
        LandingPage: {
          title: '',
          tagline: '',
          coverImg: null,
          social: {
            facebook: '',
            github: ''
          }
        },
        AboutScreen: {
          description: '',
          images: []
        },
        AboutAdmin: {
          name: '',
          profilePic: null,
          social: {
            github: '',
            email: ''
          },
          about: ''
        }
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
    SetupPortfolio (e) {
      e.preventDefault()
    }
  }
}
</script>

<style scoped>

</style>
