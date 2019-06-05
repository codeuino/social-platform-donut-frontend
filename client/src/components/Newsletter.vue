<template>
    <b-card
    id="newsCard"
    title="Trending Around">
    <hr>
    <div class="text-center">
          <b-spinner v-if="isloading" label="Spinning"></b-spinner>
          <b-carousel
      id="carousel-1"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333;"
    >
      <b-carousel-slide v-for="news in news" >
          <img
          slot="img"
          class="d-block img-fluid w-100"
          width="1024"
          height="100"
          :src="news.urlToImage"
          alt="image slot"
        >
        <div class="cardData px-3 py-1">
            <p>
            <h3>
                <a :href="news.url" class="text-white">{{news.title}}</a>
            </h3>
            </p>
            <p class="text-right"><b>- {{news.source.name}}</b></p>
        </div>
        
      </b-carousel-slide>
    </b-carousel>
    </div>
    </b-card>
</template>

<script>
import axios from 'axios'
name:'News'
export default {
    data(){
        return {
            news:[],
            isloading:true
        }
        
    },
    mounted(){
        axios.get(`https://newsapi.org/v2/top-headlines?language=en&apiKey=9ad299f940c94a938272d3c3b5d94363`)
        .then((response)=>{
            console.log(response.data.articles)
            this.news=response.data.articles.slice(0,5)
            this.isloading=false
        })
    }
}
</script>

<style scoped>
#newsCard {
    max-width: 45vw;
}
.carousel-item {
  width:45vw;
  height:40vh;
}

.cardData
{
    opacity: 0.7;
    background-color: black;
    position: relative;
    top: 50px;
    left:-8vw;
    width:45vw;
}
@media screen and (max-width: 800px) {
  #newsCard{
      max-width: 100%;
  }
  .carousel-item {
      width: 100%;
  }
  .cardData {
      left: -15vw;
      width:100%;
  }
  .carousel-caption{
      width:100%
  }
}
</style>
