<template>
    <div>
        <b-list-group>
        <b-list-group-item href="#" :active="this.$store.state.SettingState.isPactive" id="pSetting" @click="toggleActive ">Profle Settings</b-list-group-item>
        <b-list-group-item href="#" :active="this.$store.state.SettingState.isIactive" id="iSetting" @click="toggleActive">Integration Settings</b-list-group-item>
        </b-list-group>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'SettingsMenu',
  data () {
    return {
    }
  },
  methods: {
    ...mapActions({
      changeSettingView: 'changeSettingView'
    }),
    toggleActive (e) {
      if (e.target.id === 'iSetting') {
        const payload = {
          isPactive: false,
          isIactive: true
        }
        this.changeSettingView(payload)
      } else if (e.target.id === 'pSetting') {
        const payload = {
          isPactive: true,
          isIactive: false
        }
        this.changeSettingView(payload)
      }
    }
  }

}
</script>
