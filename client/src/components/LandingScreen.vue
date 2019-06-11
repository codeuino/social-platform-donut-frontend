<template>
    <div :style="backgroundImage" class="LandingScreen">
        <div class="Landingcontent">
            <h2>{{this.title}}</h2>
            <h4>{{this.tagline}}</h4>
        <div class="social">
            <b-row>
                      <a href=""><b-button class="btn-lg mr-2" variant="secondary">Contact Us</b-button></a>
                      <a :href="social.github"><b-button class="btn-lg mr-2" variant="success">Github</b-button></a>
                      <a :href="social.facebook"><b-button class="btn-lg" variant="primary">Facebook</b-button></a>
            </b-row>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"LandingScreen",
    props:{
        title:String,
        tagline:String,
        cover_img:String,
        social:Object
    },
    data () {
        return {

        }
    },
    computed:{
        backgroundImage(){
            return `background:linear-gradient(0deg,rgba(255,0,150,0.3),rgba(255,0,150,0.3)),url(${this.cover_img});background-size:cover`
        }
    },
    mounted(){
        console.log(this.cover_img)
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');
    .LandingScreen {
        height: 100%;
        min-height:95vh;
    }
    .Landingcontent {
        color: white;
        padding-top: 15%;
        padding-left: 4vw;
        font-family: 'Lato', sans-serif;
        font-weight: 100;
        max-width: 40vw;

    }
    @media screen and (max-width:700px){
        .Landingcontent {
            max-width: 90vw;
        }
    }
    .Landingcontent >h2 {
        font-size: 10vw;
        margin-bottom: 20px;
    }
    .Landingcontent > h4 {
        font-weight: 100;
        padding-left: 10px;
    }
    .social {
    margin-top: 30px;
    padding-left: 20px;
    }

</style>
