<template>

    <div>
        
        <b-navbar v-if="this.isLogged" toggleable="sm" type="dark" variant="dark">
            <router-link :to="`/`"><b-navbar-brand >DONUT</b-navbar-brand></router-link>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <router-link class="text-white" :to="`/dashboard/${id}`"> DashBoard</router-link>
                <router-link class="text-white ml-1" :to="`/profile/${id}`">Profile</router-link>

            </b-navbar-nav>

            <b-navbar-nav class="ml-auto mr-auto">
                <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit"><v-icon  small color="white">mdi-magnify</v-icon></b-button>
                </b-nav-form>
            </b-navbar-nav>
            <b-navbar-nav>
                

                <b-nav-item-dropdown right>
                <template slot="button-content"><v-icon color="white">mdi-account</v-icon></template>
                <router-link class="text-dark ml-4" :to="`/settings/${id}`">Setting</router-link>
                <b-dropdown-item href="/welcome?source=login">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <b-navbar v-else variant="dark" type="dark">
            <b-navbar-brand href="#">DONUT</b-navbar-brand>
            <b-navbar-nav class="ml-auto pr-2">
                <b-nav-item href="/welcome?source=signup">SignUp</b-nav-item>
                <b-nav-item href="/welcome?source=login">LogIn</b-nav-item>

            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    name:"NavigationBar",
    components:{

    },
    props:{
        
    },
    data(){
        return{
        
        }
    },
    computed: {
        ...mapState({
            id:'userDetails.id'
        }),
        id(){
            return this.$store.state.userDetails.id
        
        },
        isLogged(){
            return this.$store.state.isLogged
        }
    },
    
}
</script>
