<template>
    <div class="AboutScreen">
        <b-container>
            <div class="AboutScreenCard shadow-lg pb-3 pt-5 px-5">
                    <h1>
                        About Us
                    </h1>
                    <hr>
                <div>
                    <b-container>
                        <div class="content" v-html="description">
                        </div>
                    </b-container>
                </div>
            </div>
        </b-container>  
    </div>
    
    
</template>

<script>
export default {
    name:'AboutScreen',
    props:{
        description:String
    }
}
</script>

<style scoped>
    .AboutScreen{
        height:100%;
        min-height:100vh;
        padding-top: 6vh;
    }
    .AboutScreenCard {
        height:100%;
        min-height:76vh;
    }
    .AboutScreenCard > h1 {
        font-size:3vw;
    }
    .content {
    }
</style>
