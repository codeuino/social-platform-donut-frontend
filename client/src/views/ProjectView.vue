<template>
    <div class="wrapper" >
        <SideNavigation/>
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
import SideNavigation from '@/components/SideNavigation.vue'
import singlePost from '@/components/singlePost.vue'
import PopularProjects from '@/components/PopularProjects.vue'
import ProfileSuggestions from '@/components/ProfileSuggestions.vue'
import Authenticate from '@/services/Auth'
export default {
  name: 'ProjectView',
  components: {
    singlePost,
    PopularProjects,
    ProfileSuggestions,
    SideNavigation
  },
  mounted () {
    Authenticate.Authenticate(this)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap');
.wrapper {
    margin-top:25px;
    background-color:#edf2fb;
      font-family: 'Josefin Sans', sans-serif;

}
.PostView {
    min-height:50vh;
    display:grid;
    grid-template-columns: 75% 25%;
    grid-gap: 10px;
    margin-top:10px;
    margin-bottom: 60px;
}
.singlePost {
    grid-row: 1/3;
}

</style>
