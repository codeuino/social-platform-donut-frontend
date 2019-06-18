<template>
<div>
    <div class="PortfolioForm" v-if="Portfolioexist">
        <h1>
            skjhdfewgkfhewkhjbv
        </h1>
    </div>
    <div color="Portfolio" v-if="!Portfolioexist">
        <LandingScreen :title="Portfolio.LandingPage.title" :social="Portfolio.LandingPage.social" :tagline="Portfolio.LandingPage.tagline" :cover_img="Portfolio.LandingPage.cover_img" :profilePicture="Portfolio.LandingPage.profilePicture"/>
        <AboutScreen :description="Portfolio.AboutScreen.description" :images="Portfolio.AboutScreen.images"/>
        <hr>
        <ProjectScreen/>
        <AboutAdmin :Aboutadmin="Portfolio.AboutAdmin"/>
        <ContactScreen/>
        <FooterScreen/> 
    </div>
</div>
    
</template>

<script>
import LandingScreen from '@/components/LandingScreen.vue'
import AboutScreen from '@/components/AboutScreen.vue'
import ProjectScreen from '@/components/ProjectScreen.vue'
import AboutAdmin from '@/components/AboutAdmin.vue'
import ContactScreen from '@/components/ContactScreen.vue'
import FooterScreen from '@/components/FooterScreen.vue'
import  _ from 'lodash';
export default {
    name:'Portfolio',
    components:{
        LandingScreen,
        AboutScreen,
        ProjectScreen,
        AboutAdmin,
        ContactScreen,
        FooterScreen
    },
    data(){
        return {
            Portfolio:{},
            
        }
    },
    computed:{
        Portfolioexist(){
            return _.isEmpty(this.Portfolio)
        }
    },
    created(){
        // Fetch from server using axios and then
        this.Portfolio={
                LandingPage: {
                    cover_img:"https://images.pexels.com/photos/2402955/pexels-photo-2402955.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1064",
                    title:"Codeuino",
                    profilePicture:'https://placekitten.com/300/300',
                    tagline:"TEST tagine here to ensure everything working quite properly, all the  data is getting fetched from the prop",
                    social :{
                        github:"https://www.google.com",
                        facebook:"https://wwww.facebook.com"
                    }
                },
                AboutScreen: {
                    images: ["https://placekitten.com/300/300","https://placekitten.com/300/300","https://placekitten.com/300/300"],
                    description: '<p>Hello world, this a description of my org Ive just created in DONUT. Donut provides such great features for sharing new ideas among employees and building a cool social network among them.</p><ul><li>point 1</li><li>Point 2</li><li>point 1</li><li>Point 2</li><li>point 1</li><li>Point 2</li></ul><p>    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt quasi molestiae corporis quidem aliquam veritatis reiciendis nobis dignissimos nam ut quam consequuntur, placeat deleniti deserunt a architecto ex hic</p>' // We can add html in it
                },
               
                AboutAdmin: {
                name: 'Jaskirat Singh',
                profilePic:'https://placekitten.com/300/300',
                social: {
                    github: 'https://www.google.com',
                    email: 'https://wwww.facebook.com'
                },
                about: '<p>Hello world, this a description of my org Ive just created in DONUT. Donut provides such great features for sharing new ideas among employees and building a cool social network among them.</p>' // We can add html in it
                }
            }
    }

}
</script>
<style scoped>
    .Portfolio {
        color:#212121;
    }
    
</style>
