<template>
    <div class="MiniCard rounded" >
        <h1>Project Title</h1>
        <p>Weather Calucating application using Machine Learning Algorithms XD, We can ask client to add noraml text.</p>
        <div class="GithubButton text-center">
            <a class="text-white" href="">View On Github</a>
        </div>
    </div>
</template>

<script>
export default {
    name:"MiniProjectCard",
    data(){
        return {}

    }
}
</script>

<style scoped>

.MiniCard{
    min-height: 250px;
    padding: 20px;
    border: 1px rgba(0, 67, 200,0.5) solid;
    position: relative;
}
.MiniCard > h1 {
    font-size: 24px;
}
.GithubButton {
    font-size: 18px;
    background-color:  rgba(0, 67, 200,0.5);
    padding: 20px;
    width:100%;
    position: absolute;
    bottom: 0;
    left: 0;
}
</style>
