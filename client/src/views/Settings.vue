<template>
    <div >
    <b-jumbotron header="Settings" bg-variant="info"  text-variant="white" />
    <b-container >
        <b-row class="SettingBox">
            <b-col sm="3" class="mb-3">
                <SettingsMenu />
            </b-col>
            <b-col sm="9">
                <div>
                    <b-alert v-model="showDismissibleAlert" variant="success" dismissible>
                    Successfully Updated Profile
                    </b-alert>
                </div>
                <div v-if='$store.state.SettingState.isPactive' ><ProfileSettings @showAlert='showAlert'/></div>      
                <div v-if='$store.state.SettingState.isIactive'  ><IntegrationSettings @showAlert='showAlert'/></div>       
 
            </b-col>
        </b-row>
    </b-container>
    </div>
    
</template>

<script>
import IntegrationSettings from '@/components/IntegrationSettings'
import ProfileSettings from '@/components/ProfileSettings.vue'
import SettingsMenu from '@/components/SettingsMenu.vue'
export default {
    components : {
        SettingsMenu,
        ProfileSettings,
        IntegrationSettings
    },
    data () {
        return {
            showDismissibleAlert:false
        }
    },
    created(){
        if(this.$store.state.token) {
                //so for test we will use test data
                this.profile.posts=this.$store.state.userDetails.posts
            }else {
                this.$router.push({path: '/welcome', query:{source: 'login' , error:'true'}})
            }
    },
    methods:{
        showAlert(arg){
            this.showDismissibleAlert=true
            
        }
    }
}
</script>

<style scoped>
.SettingBox{
    margin-top:4vh;
}
</style>
