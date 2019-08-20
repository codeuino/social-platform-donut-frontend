<template>
  <b-container>
    <b-card class="shadow-lg">
      <b-card-header class="text-center bg-transparent">
        <h5 class="card-head mb-2">Too Lazy? We got you :)</h5>
        <a :href="this.$store.state.BaseURL +'/auth/github'" class="btn btn-dark mr-2 p-2 ">Login Using <v-icon class="text-white ml-1"> fab fa-github</v-icon> </a>
        <a href="#" class="btn btn-danger mr-2 p-2" @click="googleLogin">
          Login Using
          <v-icon class="text-white ml-1">fab fa-google</v-icon>
        </a>
        <h3 class="card-head mt-5">Login</h3>
      </b-card-header>
      <b-card-body class="my-3">
        <b-form @submit="login">
          <b-form-group label="Email">
            <b-form-input size="lg" v-model="form.email" type="email" placeholder="Enter email"></b-form-input>
            <span v-if="!emailCheck" class="err">Invalid Email</span>
          </b-form-group>
          <b-form-group label="Password">
            <b-form-input
              size="lg"
              v-model="form.password"
              type="password"
              placeholder="Enter Password"
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-form-select v-model="type" :options="options"></b-form-select>
          </b-form-group>

          <b-form-group class="text-center mt-5">
            <b-button
              type="submit"
              :disabled="isdisabled"
              variant="primary"
              class="mr-2 btn-lg btn-block"
            >Login</b-button>
          </b-form-group>

          <b-form-group class="text-right">
            <div>
              Not a member?
              <a href="/signup">Click Here</a>
            </div>
          </b-form-group>
        </b-form>
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>
import LocationService from '@/services/LocationService'
import FrontendValidation from '@/services/ValidationService'
import { mapActions } from 'vuex'
import Subscription from '@/services/Subscription'
export default {
  data () {
    return {
      options: [
        { value: 0, text: 'Individual' },
        { value: 1, text: 'Organisation' }
      ],
      form: {
        email: '',
        password: '',
        currentPosition: null
      },
      type: 0
    }
  },
  methods: {
    ...mapActions({
      addToken: 'addToken',
      addUser: 'addUser'
    }),
    login (e) {
      e.preventDefault()
      LocationService.getLocation()
        .then(position => {
          var pos = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
          this.form.currentPosition = pos
          this.$store.state.position = pos
        })
        .then(async () => {
          const response = await fetch(this.$store.state.BaseURL + '/auth/login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.form.email,
              pass: this.form.password,
              type: this.type
            })
          })
          const content = await response.json()
          try {
            if (content.status === 0) {
              alert('Login failed')
              this.$router.push({
                path: `/login`
              })
            } else {
              console.log('Login Successful')
              if ('serviceWorker' in navigator) {
                console.log('Service worker is there')
                const sub = await Subscription.createSubscription()
                const body = JSON.stringify(sub)
                const response = await fetch(
                  this.$store.state.BaseURL + '/profile/addDevice',
                  {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      Authorization: content.token
                    },
                    body: body
                  }
                )
                if (response.status === 200) {
                  alert('Device added')
                }
              } else {
                alert("Sorry, we can't support this browser")
              }
              this.addToken({
                secret_token: content.token
              })
              this.$session.start()
              this.$session.set('token', content.token)
              this.$session.set('isLogged', true)
              this.$store.state.isLogged = true
              this.$session.set('User', content.user.name)

              this.$session.set('UserID', content.user._id)
              this.$session.set('navbarName', content.user.navbarName)
              this.$router.push({ path: `/feed/${content.user._id}` })
            }
          } catch (err) {
            console.log('Network Error')
          }

          // Now we can send form details to and fetch tokens if logged in and then redirect to feed page
          // if login failed use this.$router.push({path: 'welcome', query:{source: 'login' , error:'true'}})
          // We also need to update Last login location !
          // We will also update this.$store.state.userDetails.token and add token in it if successful XD
          // this.$router.push({ path: `/feed/${User.id}` })
        })
        .catch(() => {
          alert(
            'Please Connect To internet to login and allow location access for better results'
          )
        })
    },
    googleLogin () {
      this.$gAuth
        .signIn()
        .then(async GoogleUser => {
          // On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
          // GoogleUser.getId() : Get the user's unique ID string.
          // GoogleUser.getBasicProfile() : Get the user's basic profile information.
          // GoogleUser.getAuthResponse() : Get the response object from the user's auth session. access_token and so on
          this.isSignIn = this.$gAuth.isAuthorized
          return GoogleUser
        })
        .then(GoogleUser => {
          fetch(this.$store.state.BaseURL + '/auth/googleLogin', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: GoogleUser.w3.U3,
              googleID: GoogleUser.w3.Eea
            })
          })
            .then(async response => {
              console.log(response)
              if (response.status === 200) {
                const content = await response.json()
                this.$session.start()
                this.$session.set('token', content.token)
                this.$store.state.isLogged = true
                this.$session.set('User', content.user.name)
                this.$session.set('navbarName', content.user.navbarName)
                this.$session.set('UserID', content.user._id)
                this.$router.push({ path: `/feed/${content.user._id}` })
              } else {
                alert('Login failed')
                this.$router.push({
                  path: `/login`
                })
              }
            })
            .catch(error => {
              alert('Please check your internet connection')
              console.log(error)
            })
        })
        .catch(error => {
          // on fail do something
          console.log(error)
        })
    }
  },
  computed: {
    emailCheck () {
      return (
        FrontendValidation.isValidEmail(this.form.email) ||
        this.form.email.length === 0
      )
    },
    isdisabled () {
      return !this.emailCheck || this.form.email.length === 0
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  position: relative;
  top: 70px;
}
.err {
  color: red;
}
</style>
