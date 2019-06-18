<template>
    <div class="ProjectScreen" id="ProjectScreen" >
        <b-container>
            <header>
                    <h1 class="ProjectHeading">Our Projects</h1>
            </header>
            <hr>
            <div class="Projects mt-5" >
                <MiniProjectCard />
                <MiniProjectCard />
                <MiniProjectCard />
                <MiniProjectCard />
                <MiniProjectCard />
                <MiniProjectCard />
                <MiniProjectCard />

            </div>
        </b-container>
            
    </div>
</template>

<script>
import MiniProjectCard from '@/components/MiniProjectCard.vue'
export default {

    name:'ProjectScreen',
    props:{
        
    },
    components:{
        MiniProjectCard,
    },
    data(){
        return {

        }
    },
    computed:{
        
    },
    mounted(){
        console.log(this.innerWidth)
    }
    
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');

    .ProjectHeading {
        font-family: 'Raleway', sans-serif;
        font-size:40px;
        padding-top: 4vh;
    
    }
    .ProjectScreen {
        min-height: 100vh;
        padding-bottom: 6vw;

    }
    .Projects {
        display: grid;
        grid-template-columns: auto auto auto;
        grid-gap: 10px 10px;
    }
    @media screen and (max-width:786px) {
        .Projects{
            grid-template-columns: auto auto;
        }
        
    }
    @media screen and (max-width:470px) {
        .Projects{
            grid-template-columns: auto;
        }
        
    }
</style>
