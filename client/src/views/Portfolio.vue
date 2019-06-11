<template>
    <div>
        <LandingScreen :title="Portfolio.LandingPage.title" :social="Portfolio.LandingPage.social" :tagline="Portfolio.LandingPage.tagline" :cover_img="cover_img"/>
        <AboutScreen :description="Portfolio.AboutScreen.description"/>
    </div>
</template>

<script>
import LandingScreen from '@/components/LandingScreen.vue'
import AboutScreen from '@/components/AboutScreen.vue'
export default {
    name:'Portfolio',
    components:{
        LandingScreen,
        AboutScreen
    },
    data(){
        return {
            Portfolio:{},
            cover_img:"https://images.pexels.com/photos/2402955/pexels-photo-2402955.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1064",
            title:"Codeuino",
            tagline:"TEST"
        }
    },
    created(){
        //Fetch from server using axios and then
        this.Portfolio={
                LandingPage: {
                cover_img:"https://images.pexels.com/photos/2402955/pexels-photo-2402955.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1064",
                title:"Codeuino",
                tagline:"TEST tagine here to ensure everything working quite properly, all the  data is getting fetched from the prop",
                social :{
                    github:"https://www.google.com",
                    facebook:"https://wwww.facebook.com"
                }
                },
                AboutScreen: {
                    description: '<p>Hello world, this a description of my org Ive just created in DONUT. Donut provides such great features for sharing new ideas among employees and building a cool social network among them.</p><ul><li>point 1</li><li>Point 2</li><li>point 1</li><li>Point 2</li><li>point 1</li><li>Point 2</li></ul><p>faketextfaketextfaketextfaketextfaketextfaketextfaketextfaketextfaketextfaketextfaketextfaketextfaketextfaketextfaketextf aketextfaketextfaketextfaketextfaketextfaketextfaketextfaketextfa ketextfaketextfaketextfaketextfaketextfaketextfaketextfaketextfaketextfaketextfaketextfaketextfaketextfaketex tfaketextfaketextfaketextfaketextfaketextfaketextfaketextfaketextfaketextfaketextfaketex tfaketextfaketextfaketextfaketextfaketextfaketext faketextfaketextfaketextfaketextfaketextfaketextfak etextfaketextfaketextfaketextfaketextfaketextfaketextfaketextfaketextfaketextf aketextfaketextfaketextfaketextfaketext faketextfaketextfaketextfaketextfaketextfak etextfaketextfaketextfaketext faketextfaketextfaketextfaketextfaketextfaketextfaketextfaketextfaketextfaketex tfaketextfaketextfaketextfaketextfaketextfaketextfaketextfaketextfaketextfaketex tfaketextfaketextfaketextfaketextfaketextfaketextfaketextfaketextfaketext faketextfaketextfaketextfaketextfaketextfaketextfaketextfak etextfaketextfaketextfaket extfaketextfaketextfaketextfaketextfaketex tfaketextfaketextfaketextfaketextfaketextfaketex tfaketextfaketext</p>' // We can add html in it
                },
                Goals: {
                goals: '', // We can add html in it
                images: []
                },
                AboutAdmin: {
                name: '',
                social: {
                    github: '',
                    email: ''
                },
                about: '' // We can add html in it
                }
            }
    }

}
</script>
<style scoped>
    

</style>
