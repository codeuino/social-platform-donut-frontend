<template>
    <div >
    <b-jumbotron header="Settings" bg-variant="info"  text-variant="white" />
    <b-container >
        <b-row class="SettingBox">
            <b-col sm="3" class="mb-3">
                <SettingsMenu />
            </b-col>
            <b-col sm="9">
                <div v-if='$store.state.SettingState.isPactive'><ProfileSettings/></div>      
                <div v-if='$store.state.SettingState.isIactive'><IntegrationSettings/></div>       
 
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

        }
    }
}
</script>

<style scoped>
.SettingBox{
    margin-top:4vh;
}
</style>
