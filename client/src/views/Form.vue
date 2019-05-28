<template>
    <div>
        <!-- This view holds kinds of forms such as CreatePost and Settings  -->
        <div v-if="source==='Settings'">
            This is setting page
        </div>
        <div v-if="source==='CreatePost'">
            This is Create Post page
        </div>
    </div>
</template>

<script>
import SettingForm from '@/components/SettingForm.vue'
import CreatePost from '@/components/CreatePost.vue'

export default {
    name:'Form',
    components:{
        CreatePost,
        SettingForm
    },
    data () {
        return {
        source: null, // Local state, Source will tells us which component to render 

        }
    },
    created() {
        this.source=this.$route.query.source
    },
}
</script>

<style scoped>

</style>


