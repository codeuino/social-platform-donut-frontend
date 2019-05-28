<template>

    <div>
        
        <b-navbar v-if="this.isLogged" toggleable="sm" type="dark" variant="dark">
            <b-navbar-brand href="/">DONUT</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="/dashboard">DashBoard</b-nav-item>
                <b-nav-item v-bind:href="'/profile/' +this.id">Profile</b-nav-item>

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
                <b-dropdown-item v-bind:href="'/settings/' +this.id">Setting</b-dropdown-item>
                <b-dropdown-item href="">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <b-navbar v-else variant="dark" type="dark">
            <b-navbar-brand href="#">DONUT</b-navbar-brand>
            <b-navbar-nav class="ml-auto pr-2">
                <b-nav-item href="#">SignUp</b-nav-item>
                <b-nav-item href="#">LogIn</b-nav-item>

            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
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
        id(){
            return this.$store.state.id
        
        },
        isLogged(){
            return this.$store.state.isLogged
        }
    },
    
}
</script>
