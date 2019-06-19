<template>
    <div class="AboutScreen" id="AboutScreen">
        <b-container>
            <div class="AboutScreenCard pb-3 pt-5 px-5 ">
                    <h1 class="text-center">
                        About Us
                    </h1>
                    <hr>
                <div>
                    <b-container>
                        <div class="content" v-html="description">
                        </div>
                    </b-container>
                </div>

                <div class="Gallery">
                    <div><img :src="images[0]" class="shadow-lg" alt=""></div>
                    <div><img :src="images[1]" class="shadow-lg" alt=""></div>
                    <div><img :src="images[2]" class="shadow-lg" alt=""></div>
                </div>
            </div>
        </b-container>
    </div>

</template>

<script>
export default {
  name: 'AboutScreen',
  props: {
    description: String,
    images: Array
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');
    .AboutScreen{
        height:100%;
        padding-top: 6vh;
        padding-bottom: 6vh;
    }
    .AboutScreenCard {
        height:100%;
    }
    .AboutScreenCard > h1 {
        font-size:40px;
    }
    .content {
        word-wrap: break-word;
        font-size: 18px;
        font-family: 'Raleway', sans-serif;
        text-align: justify
    }
    .Gallery {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    img {
        height: 300px;
        margin-bottom: 8px;
    }
    img:hover{
        animation: enlargeThePic 1s forwards;
    }
    @keyframes enlargeThePic {
        100% {
            transform: scale(1.06)
        }

    }
</style>
