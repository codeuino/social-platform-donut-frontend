<template>
    <div class="FooterScreen text-center bg-info text-white">
        <p>Powered By Donut</p>
        <div class="Social">
            <a href=""><v-icon class="text-white ml-4 "> fab fa-github</v-icon></a>
            <a href=""><v-icon class="text-white ml-4"> fab fa-linkedin</v-icon></a>
            <a href=""><v-icon class="text-white ml-4"> fab fa-twitter</v-icon></a>
        </div>
    </div>
</template>
<script>
export default {
  name: 'FooterScreen'
}
</script>

<style scoped>
.FooterScreen {
    padding-top:5vh;
    padding-bottom:5vh;
    font-weight: 200;
}
.FooterScreen >p {
    font-size:24px;
}
</style>
