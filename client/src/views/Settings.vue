<template>
    <div class="setting-wrapper" :class="$store.state.darkMode ? 'dark' : ''">
    <b-jumbotron header="Settings" :bg-variant="$store.state.darkMode ? 'dark' :'info'"  text-variant="white" />
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
  components: {
    SettingsMenu,
    ProfileSettings,
    IntegrationSettings
  },
  data () {
    return {
      showDismissibleAlert: false
    }
  },
  created () {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    }
  },
  methods: {
    showAlert (arg) {
      this.showDismissibleAlert = true
    }
  }
}
</script>

<style scoped>
.setting-wrapper {
  min-height: 95vh;
}
.SettingBox{
    margin-top:4vh;
}
.dark {
  background-color: #121212;
}
</style>
