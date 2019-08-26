<template>
    <div class="AboutScreen" id='AboutAdmin'>
            <div class="AboutScreenCard shadow-lg pb-3 pt-5 px-5 bg-dark text-white">
                    <h1 class="text-center">
                        About Admin
                    </h1>
                <div>
                    <b-container >
                        <div class="text-center mb-4">
                            <img class="profilePic mb-3" :src="Aboutadmin.profilePic" alt="">
                            <h3>{{Aboutadmin.name}}</h3>
                        </div>
                        <div class="content" v-html="Aboutadmin.about">
                        </div>
                    </b-container>
                </div>
            </div>

    </div>

</template>

<script>
export default {
  name: 'AboutAdmin',
  props: {
    Aboutadmin: Object
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');
    .AboutScreen{
        height:100%;
    }
    .AboutScreenCard {
        height:100%;
    }
    .AboutScreenCard > h1 {
        font-size:46px;
    }
    .content {
        word-wrap: break-word;
        font-size: 20px;
        font-family: 'Raleway', sans-serif;

    }
    .profilePic {
        height:200px;
        border: solid 1px transparent;
        border-radius: 50%;
    }
</style>
