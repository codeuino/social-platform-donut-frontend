<template>
            <b-container>
                    <div v-if="isLoading" class="w-100 p-3 bg-light">
                      <center>
                          <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" ></b-spinner>
                          <br>
                          <br>
                          Please Wait
                      </center>
                    </div>
                    <b-card class="shadow-lg">

                        <b-card-header class="text-center bg-transparent">
                                <h5 class="card-head mb-2">
                                    Too Lazy? We got you :)
                                </h5>
                                <a href="http://localhost:3000/auth/github" class="btn btn-dark mr-2 p-2 " @click="githubLogin">Signup Using <v-icon class="text-white ml-1"> fab fa-github</v-icon> </a>
                                <a href="#" @click="googleSignup" class="btn btn-danger mr-2 p-2">Signup Using <v-icon class="text-white ml-1"> fab fa-google</v-icon></a>
                                <h2 class="card-head mt-5"> Or Signup</h2>
                        </b-card-header>

                        <b-card-body class="my-3">
                            <b-form v-if="!isLoading" @submit="register">
                                <!-- Email -->

                                <b-form-group
                                label="Email"
                                >
                                <b-form-input
                                size="lg"
                                v-model="email"
                                type="email"
                                placeholder="Enter email"
                                ></b-form-input>
                                <span v-if="!emailCheck" class="err">Invalid Email</span>

                                </b-form-group>

                                <!-- Name -->

                                <b-form-group
                                label="User Name or Organisation Name"
                                >
                                <b-form-input
                                size="lg"
                                v-model="name"
                                type="text"
                                placeholder="Enter Name"
                                ></b-form-input>
                                </b-form-group>

                                <!-- Passwords -->

                                <b-form-group
                                label="Password"
                                >

                                <b-form-input
                                size="lg"
                                v-model="password"
                                type="password"
                                placeholder="Enter Password"
                                ></b-form-input>
                                </b-form-group>

                                <b-form-group
                                label="Retype Password"
                                >
                                <b-form-input
                                size="lg"
                                v-model="repassword"
                                type="password"
                                placeholder="Re-Enter Password"
                                ></b-form-input>
                                <span v-if="passCheck" class="err">Passwords doesn't match</span>
                                </b-form-group>

                                <b-form-group class="text-center mt-5">
                                    <b-button type="submit" variant="primary" :disabled="isdisabled" class="mr-2 btn-lg btn-block">Register</b-button>
                                </b-form-group>

                                <b-form-group class="text-right">
                                    <div>
                                        Already a member? <a href="/login">Click Here</a>
                                    </div>
                                </b-form-group>
                            </b-form>
                        </b-card-body>
                    </b-card>
            </b-container>
</template>

<script>
import { mapActions } from 'vuex'
import LocationService from '@/services/LocationService'
import FrontendValidation from '@/services/ValidationService'
export default {
  data () {
    return {
      email: '',
      name: '',
      password: '',
      repassword: '',
      isLoading: false
    }
  },
  methods: {
    ...mapActions({
      addSignupData: 'addSignupData'
    }),
    register (e) {
      e.preventDefault()
      LocationService.getLocation()
        .then((position) => {
          this.currentPosition = position
          this.$store.state.position = position
        })
        .then(async () => {
          this.addSignupData({
            email: this.email,
            password: this.password,
            name: this.name
          })
          this.$router.push('/signup/2')
          // We'll now send this data to register page as redirect!
        })
      // Now we can send form details to and fetch tokens if logged in and then redirect to feed page
      // if login failed use this.$router.push({path: 'welcome', query:{source: 'login' , error:'true'}})
      // We also need to update Last login location !
      // We will also update this.$store.state.userDetails.token and add token in it if successful
    },
    googleSignup () {
      this.isLoading = true
      this.$gAuth.signIn()
        .then(GoogleUser => {
          // On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
          console.log('user', GoogleUser)
          // GoogleUser.getId() : Get the user's unique ID string.
          // GoogleUser.getBasicProfile() : Get the user's basic profile information.
          // GoogleUser.getAuthResponse() : Get the response object from the user's auth session. access_token and so on
          this.isSignIn = this.$gAuth.isAuthorized
          this.addSignupData({
            email: GoogleUser.w3.U3,
            password: '123345', // for test
            name: GoogleUser.w3.ig,
            googleID: GoogleUser.w3.Eea
          })
          this.isLoading = false
          this.$router.push('/signup/2')
        })
        .catch(error => {
          // on fail do something
          console.log(error)
        })
    },
    githubLogin () {
      console.log('Logging with github')
    }
  },
  computed: {
    passCheck () {
      return !FrontendValidation.isSamePassword(this.password, this.repassword)
    },
    emailCheck () {
      return FrontendValidation.isValidEmail(this.email) || this.email.length === 0
    },
    isdisabled () {
      return (!(this.emailCheck) && this.passCheck) || this.email.length === 0 || this.password === 0
    }

  }
}
</script>

<style scoped>
.container {
    max-width: 1200px;
    position: relative;
    top:70px;

}
.err{
    margin-left: 3px;
    color: red;
    font-size: 12px;
}
</style>
