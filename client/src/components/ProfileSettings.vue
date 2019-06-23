<template>
    <div>
        <b-card
        class="pb-5 pt-2 px-3"
        title="Profile Setting"
        >
        <hr>
            <b-card-body>
                <b-form>
                    <b-row class="my-3">
                        <b-col md="3" class="text-center">
                            <div class="upload-btn-wrapper mt-5">
                                <span>{{newPhoto}}</span>
                                <button  class="btn btn-block mt-2 btn-primary">Add A New Photo</button>
                                <b-form-file v-model="userData.image" class="mt-1" plain></b-form-file>
                            </div>

                        </b-col>
                        <b-col>
                            <b-form-group
                            label="Name"
                            >
                            <b-form-input
                            type="text"
                            v-model="userData.name"
                            placeholder="Enter Name"
                            required
                            />
                            <span v-if="nameCheck" class="err">No Special Characters!</span>
                            </b-form-group>
                            <b-form-group
                            label="Date Of Birth"
                            >
                            <b-form-input
                            type="date"
                            required
                            v-model="userData.date"
                            ></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-form-group
                    label="Country"
                    >
                        <b-form-input
                        v-model="userData.location.country"
                        required
                        placeholder="Write Country's Name"
                        />
                    </b-form-group>
                    <b-form-group
                    label="City"
                    >
                        <b-form-input
                        v-model="userData.location.city"
                        required
                        placeholder="Write City's Name"
                        />
                    </b-form-group>
                    <b-form-group
                    label="Bio"
                    >
                    <b-form-textarea
                    id="textarea"
                    v-model="userData.bio"
                    placeholder="Enter something..."
                    rows="3"
                    no-resize
                    ></b-form-textarea>
                    <span v-if="countCheck" class="err">Bios are supposed to be short! And yours look too long</span>
                    </b-form-group>
                    <b-form-group>
                        <b-button type="submit" :disabled="nameCheck || countCheck || isSubmitting" variant="primary" @click="formSubmit" class="btn-block btn-lg"><span v-if="!isSubmitting">Save Changes</span> <span v-if="isSubmitting">Submitting<b-spinner small varient="light" label="Small Spinner"></b-spinner>
</span></b-button>
                    </b-form-group>
                </b-form>
            </b-card-body>
        </b-card>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import ValidationService from '@/services/ValidationService'
export default {
  name: 'ProfileSettings',
  data () {
    return {
      isSubmitting: false,
      userData: {
        image: '',
        name: '',
        dob: '',
        location: {
          country: '',
          city: ''
        },
        bio: ''

      }
    }
  },
  methods: {
    ...mapActions({
      updateUser: 'updateUser'
    }),
    formSubmit (e) {
      this.isSubmitting = true
      console.log(this.userData)
      e.preventDefault()
      this.updateUser(this.userData)
      this.userData = {
        image: null,
        name: '',
        dob: '',
        location: {
          country: '',
          city: ''
        },
        bio: ''
      }
      this.$emit('showAlert', true)
      this.isSubmitting = false // TO remove spinner :)
      // Now here we will update our user data on backend
      // and also update our local data
    }
  },
  computed: {
    nameCheck () {
      return ValidationService.isValidText(this.userData.name)
    },
    countCheck () {
      return !ValidationService.isTextUnderLimit(this.userData.bio, 150)
    },
    newPhoto () {
      if (this.userData.image) {
        return this.userData.image.name
      } else {
        return 'No Photo Selected'
      }
    }
  },
  mounted () {
    // We'll fetch from user database from here using JWT and $route.params.id
    // and we will fetch current userDetails
    this.userData.name = this.$store.state.userDetails.name
    this.userData.dob = this.$store.state.userDetails.dob
    this.userData.image = this.$store.state.userDetails.profilePicture
    this.userData.location = this.$store.state.userDetails.location
    this.userData.bio = this.$store.state.userDetails.bio
  }

}
</script>

<style scoped>
.err{
    margin-left: 3px;
    color: red;
    font-size: 12px;
}
.upload-btn-wrapper input[type=file] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>
