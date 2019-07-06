<template>
            <b-container>
                    <b-card class="shadow-lg">
                        <b-card-header class="text-center bg-transparent">
                                <h5 class="card-head mb-2">
                                    Too Lazy? We got you :)
                                </h5>
                                <a href="#" class="btn btn-dark mr-2 p-2 ">Login Using <v-icon class="text-white ml-1"> fab fa-github</v-icon> </a>
                                <a href="#" class="btn btn-danger mr-2 p-2">Login Using <v-icon class="text-white ml-1"> fab fa-google</v-icon></a>
                            <h3 class="card-head mt-5">Login</h3>
                            </b-card-header>
                        <b-card-body class="my-3">
                            <b-form @submit="login">
                                <b-form-group
                                label="Email"
                                >
                                <b-form-input
                                size="lg"
                                v-model="form.email"
                                type="email"
                                placeholder="Enter email"
                                ></b-form-input>
                                <span v-if="!emailCheck" class="err">Invalid Email</span>
                                </b-form-group>
                                <b-form-group
                                label="Password"
                                >
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
                                    <b-button type="submit" :disabled="isdisabled" variant="primary" class="mr-2 btn-lg btn-block">Login</b-button>
                                </b-form-group>

                                <b-form-group class="text-right">
                                    <div>
                                        Not a member? <a href="/signup">Click Here</a>
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
        .then((position) => {
          var pos = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
          this.form.currentPosition = pos
          this.$store.state.position = pos
        })
        .then(async () => {
          const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: this.form.email, pass: this.form.password, type: this.type })
          })
          const content = await response.json()
          try {
            if (content.status === 0) {
              this.$router.push({ path: `/login?err=true?msg=${content.error}` })
            } else {
              this.addToken({
                secret_token: content.token
              })
              this.addUser(content.user)
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
    }
  },
  computed: {
    emailCheck () {
      return FrontendValidation.isValidEmail(this.form.email) || this.form.email.length === 0
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
    top:70px;

}
.err {
    color: red;

}
</style>
