<template>
            <b-container>
                    <b-card class="shadow-lg">

                        <b-card-header class="text-center bg-transparent">
                                <h5 class="card-head mb-2">
                                    Too Lazy? We got you :)
                                </h5>
                                <a href="#" class="btn btn-dark mr-2 p-2 ">Signup Using <v-icon class="text-white ml-1"> fab fa-github</v-icon> </a>
                                <a href="#" class="btn btn-danger mr-2 p-2">Signup Using <v-icon class="text-white ml-1"> fab fa-google</v-icon></a>
                                <h2 class="card-head mt-5"> Or Signup</h2>
                        </b-card-header>

                        <b-card-body class="my-3">
                            <b-form @submit="register">
                                <!-- Account Type -->

                                <b-form-group>
                                    <b-form-select
                                    class="mb-2 mr-sm-2 mb-sm-0"
                                    :value="null"
                                    v-model="form.type"
                                    :options="{ '0': 'Individual', '1': 'Organisation' }"
                                    id="inline-form-custom-select-pref"
                                    required
                                    >
                                    <option slot="first" :value="null">Choose Account Type...</option>
                                    </b-form-select>
                                </b-form-group>

                                <!-- Email -->

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

                                <!-- Name -->

                                <b-form-group
                                label="User Name or Organisation Name"
                                >
                                <b-form-input
                                size="lg"
                                v-model="form.name"
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
                                v-model="form.password"
                                type="password"
                                placeholder="Enter Password"
                                ></b-form-input>
                                </b-form-group>

                                <b-form-group
                                label="Retype Password"
                                >
                                <b-form-input
                                size="lg"
                                v-model="form.repassword"
                                type="password"
                                placeholder="Re-Enter Password"
                                ></b-form-input>
                                <span v-if="passCheck" class="err">Passwords doesn't match</span>
                                </b-form-group>

                                <!-- Location -->

                                <b-form-group
                                label="Country"
                                >
                                    <b-form-input
                                    v-model="form.location.country"
                                    type="text"
                                    size="lg"
                                    placeholder="Country Name"
                                    required
                                    >
                                    </b-form-input>
                                </b-form-group>

                                <b-form-group
                                label="City"
                                >
                                    <b-form-input
                                    type="text"
                                    v-model="form.location.city"
                                    size="lg"
                                    placeholder="City Name"
                                    required
                                    >

                                    </b-form-input>
                                </b-form-group>

                                <!-- Admin Name -->

                                <b-form-group
                                label="Admin's Name"
                                >
                                    <b-form-input
                                    type="text"
                                    v-model="form.admin_name"
                                    size="lg"
                                    :disabled="!isOrg"
                                    placeholder="Admin's Name"
                                    required
                                    >

                                    </b-form-input>
                                </b-form-group>

                                <!-- Gender -->

                                <b-form-group
                                label="Gender"
                                >

                                    <b-form-select
                                    :disabled="isOrg"
                                    class="mb-2 mr-sm-2 mb-sm-0"
                                    :value="null"
                                    v-model="form.gender"
                                    :options="{ 'male': 'Male', 'female': 'Female','other':'Other' }"
                                    required
                                    >
                                    <option slot="first" :value="null">Gender</option>
                                    </b-form-select>
                                </b-form-group>

                                <!-- Social Media Handles -->

                                <b-form-group
                                label="Github Handle"
                                >
                                    <b-form-input
                                    type="text"
                                    v-model="form.social.github"
                                    size="lg"
                                    required
                                    placeholder="Github Account "
                                    >

                                    </b-form-input>
                                </b-form-group>

                                <b-form-group
                                label="Facebook Profile Link"
                                >
                                    <b-form-input
                                    type="text"
                                    v-model="form.social.facebook"
                                    size="lg"
                                    placeholder="Facebook Account "
                                    required
                                    >

                                    </b-form-input>
                                </b-form-group>

                                <b-form-group
                                label="Twitter Profile Link"
                                >
                                    <b-form-input
                                    type="text"
                                    v-model="form.social.twitter"
                                    size="lg"
                                    placeholder="Twitter Account "
                                    required
                                    >

                                    </b-form-input>
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
import LocationService from '@/services/LocationService'
import FrontendValidation from '@/services/ValidationService'
import User from '@/assets/test_data/users'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      form: {
        email: '',
        name: '',
        password: '',
        repassword: '',
        type: null, // 0 for user and 1 for org :)
        location: {
          country: '',
          city: ''
        },
        admin_name: '', // only for org type
        gender: null, // only for user type
        social: {
          facebook: null,
          github: null,
          twitter: null
        }
      }
    }
  },
  methods: {
    ...mapActions({
      addToken: 'addToken',
      addUser: 'addUser'
    }),
    register (e) {
      LocationService.getLocation()
        .then((position) => {
          this.form.currentPosition = position
          this.$store.state.position = position
        })
        .then(() => {
          // Now we can send form details to and fetch tokens if logged in and then redirect to feed page
          // if login failed use this.$router.push({path: 'welcome', query:{source: 'login' , error:'true'}})
          // We also need to update Last login location !
          // We will also update this.$store.state.userDetails.token and add token in it if successful XD
          this.addToken({
            test: 'Test Token'
          })
          this.addUser(User)
          this.$router.push({ path: `/feed${User.id}` })
        })
      e.preventDefault()
    }
  },
  computed: {
    passCheck () {
      return !FrontendValidation.isSamePassword(this.form.password, this.form.repassword)
    },
    emailCheck () {
      return FrontendValidation.isValidEmail(this.form.email) || this.form.email.length === 0
    },
    isdisabled () {
      return this.emailCheck || this.passCheck || this.form.email.length === 0
    },
    isOrg () {
      return this.form.type === 1
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
