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
                                <span v-if="emailCheck" class="err">Invalid Email</span>           
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

                                <b-form-group class="text-center mt-5">
                                    <b-button type="submit" :disabled="isdisabled" variant="primary" class="mr-2 btn-lg btn-block">Login</b-button>
                                </b-form-group>

                                <b-form-group class="text-right">
                                    <div>
                                        Not a member? <a href="/welcome?source=signup">Click Here</a>
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
import {mapActions} from 'vuex'
export default {
    data () {
        return {
            form:{
                email:"",
                password:"",
                currentPosition:null,
            }
            
        }
    },
    methods: {
        ...mapActions({
            addToken:'addToken'
        }),
        login(e){
            e.preventDefault()
            LocationService.getLocation()
            .then((position) => {
                this.form.currentPosition=position
                this.$store.state.position=position
            })
            .then(()=>{
                // Now we can send form details to and fetch tokens if logged in and then redirect to feed page
                // if login failed use this.$router.push({path: 'welcome', query:{source: 'login' , error:'true'}})
                // We also need to update Last login location !
                // We will also update this.$store.state.userDetails.token and add token in it if successful XD
                this.addToken({
                    test:'Test Token'
                })
                this.$router.push({path: '/'})
            })

            
        }
    },
    computed: {
        emailCheck(){
            return !FrontendValidation.isValidEmail(this.form.email)
        },
        isdisabled ()
        {
            return this.emailCheck || this.passCheck
        },
        
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
