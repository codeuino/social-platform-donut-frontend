<template>
    <div class="wrapper">
        <b-container >
            <div class="PostView">
                <singlePost class="singlePost" />
                <div>
                    <PopularProjects class="PopularProjects"/>
                    <br>
                    <ProfileSuggestions class="ProfileSuggestions"/>
                </div>
            </div>
            
        </b-container>
    </div>    
</template>

<script>
import singlePost from '@/components/singlePost.vue'
import PopularProjects from '@/components/PopularProjects.vue'
import ProfileSuggestions from '@/components/ProfileSuggestions.vue'

export default {
    name : 'PostView',
    components:{
        singlePost,
        PopularProjects,
        ProfileSuggestions
    }
}
</script>

<style scoped>
.PostView {
    min-height:50vh;
    display:grid;
    grid-template-columns: 75% 25%;
    grid-gap: 10px;
}
.singlePost {
    grid-row: 1/3; 
}

</style>
