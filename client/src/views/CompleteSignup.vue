<template>
    <div>
        <b-jumbotron
        header="Complete Signup"
        lead="Complete Following Steps To Register"
        >
        </b-jumbotron>
        <b-container class="mt-5">
            <div class="form">
                <b-form
                @submit="addUser">
                                <b-form-group
                                label="Choose Account Type">
                                                <b-form-select
                                                class="mb-2 mr-sm-2 mb-sm-0"
                                                :value="null"
                                                v-model="type"
                                                :options="{ '0': 'Individual', '1': 'Organisation' }"
                                                id="inline-form-custom-select-pref"
                                                required
                                                >
                                                <option slot="first" :value="null">Choose Account Type...</option>
                                                </b-form-select>
                                </b-form-group>
                                <!-- Bio -->
                                <b-form-group
                                label="Bio"
                                >
                                    <b-form-input
                                    v-model="bio"
                                    type="text"
                                    size="lg"
                                    placeholder="Write something about yourself"
                                    required
                                    >
                                    </b-form-input>
                                </b-form-group>
                                <!-- Location -->

                                <b-form-group
                                label="Country"
                                >
                                    <b-form-input
                                    v-model="country"
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
                                    v-model="city"
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
                                    v-model="adminName"
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
                                    v-model="gender"
                                    :options="{ 0: 'Male', 1: 'Female',2:'Other' }"
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
                                    v-model="github"
                                    size="lg"
                                    required
                                    placeholder="Github Account "
                                    >
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group
                                label="Custom Navbar"
                                >
                                    <b-form-input
                                    type="text"
                                    v-model="navbarName"
                                    size="lg"
                                    required
                                    placeholder="Custom Navbar "
                                    >
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group class="text-center mt-5">
                                    <b-button type="submit" @click="addUser" variant="primary" class="mr-2 btn-lg btn-block">Complete Registration</b-button>
                                </b-form-group>
                </b-form>
            </div>
        </b-container>
    </div>
</template>

<script>
export default {
  name: 'signup2',
  data () {
    return {
      country: '',
      bio: '',
      city: '',
      github: '',
      adminName: '',
      gender: 0,
      type: '',
      navbarName: 'Donut'
    }
  },
  methods: {
    async addUser (e) {
      e.preventDefault()
      const email = this.$store.state.temp.email
      const password = this.$store.state.temp.password
      const name = this.$store.state.temp.name
      let googleID = this.$store.state.temp.googleID ? this.$store.state.temp.googleID : ''
      let githubID = this.$store.state.temp.githubID ? this.$store.state.temp.githubID : ''
      const response = await fetch(this.$store.state.BaseURL + '/auth/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          pass: password,
          type: this.type,
          name: name,
          social: {
            github: this.github
          },
          adminName: this.adminName,
          gender: this.gender,
          location: {
            country: this.country,
            city: this.city
          },
          googleID: googleID,
          githubID: githubID,
          navbarName: this.navbarName,
          bio: this.bio

        })
      })
      if (response.status === 200) {
        alert('Congratulations, you are successfully signed in')
        this.$router.push('/login')
      } else {
        alert('Failed to register')
        this.$router.push('/signup')
      }
    }
  },
  computed: {
    isOrg () {
      return parseInt(this.type) === 1
    }
  },
  mounted () {
    if (!this.$store.state.temp.hasOwnProperty('email')) {
      this.$router.push('/signup')
    }
  }
}
</script>

<style scoped>

</style>
