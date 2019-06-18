<template>
    <div class="ContactScreen" id="ContactScreen">
        <div class="ContactScreenHeading text-center">
            Reach Us
        </div>
        <div class="ContactForm">
            <b-container>
                <b-form>
                <b-form-group
                label="Enter Email"
                description="We'll never share your email with anyone else."
                >
                <b-form-input
                type="email"
                placeholder="Enter Email"
                v-model="form.email"
                >
                </b-form-input>
                <span v-if="emailCheck" class="err">Invalid Email</span>
                </b-form-group>
                <b-form-group
                label="Enter Message"
                >
                <b-form-textarea
                    v-model="form.message"
                    placeholder="Enter Your Message"
                    rows="3"
                    no-resize
                ></b-form-textarea>
                </b-form-group>
                <b-button type="submit" :disabled="emailCheck" variant="primary">Submit</b-button>
                </b-form>

            </b-container>
        </div>
    </div>
</template>

<script>
import FrontendValidation from '@/services/ValidationService'

export default {
  name: 'ContactScreen',
  data () {
    return {
      form: {
        email: '',
        message: ''

      }
    }
  },
  computed: {
    emailCheck () {
      return !FrontendValidation.isValidEmail(this.form.email)
    }

  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');

.ContactScreenHeading {
    font-size:40px;
    text-decoration: underline;
    font-family: 'Lato';
    margin-bottom: 8vh;
}
.ContactScreen {
    padding-top: 2vh;
    padding-bottom: 10vh;

}
.err {
    color: red;

}
</style>
