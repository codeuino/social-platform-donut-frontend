<template>
  <div>
    <div class="hero" :style="backgroundImage">
      <div class="content">
        <h1>Organisation Name</h1>
        <h2>Tagline</h2>
        <div>
          <span class="Contact-btn">
            <b-button pill variant="outline-light">Contact Us</b-button>
          </span>
          <span class="Github-btn">
            <b-button pill variant="outline-light">Github</b-button>
          </span>
        </div>
      </div>
    </div>

    <div class="Nav bg-dark">
      <b-container>
        <b-row class="text-center">
          <b-col sm="3">
            <a class="NavIcon" href="#AboutScreen" v-smooth-scroll="{ duration: 250}">About</a>
          </b-col>
          <b-col sm="3">
            <a class="NavIcon" href="#ProjectScreen" v-smooth-scroll="{ duration: 250}">Projects</a>
          </b-col>
          <b-col sm="3">
            <a class="NavIcon" href="#AboutAdmin" v-smooth-scroll="{ duration: 250}">Admin</a>
          </b-col>
          <b-col sm="3">
            <a class="NavIcon" href="#ContactScreen" v-smooth-scroll="{ duration: 250}">Contact</a>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingScreen",
  props: {
    title: String,
    tagline: String,
    cover_img: String,
    social: Object,
    profilePicture: String
  },
  data() {
    return {};
  },
  computed: {
    backgroundImage() {
      return `background:linear-gradient(0deg,rgba(0, 67, 200,0.5),rgba(0, 67, 200,0.5)),url(${this.cover_img});background-size:cover`;
    }
  },
  mounted() {}
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Raleway&display=swap");

.hero {
  display: flex;
  min-height: 600px;
  font-family: "Raleway", sans-serif;
  color: white;
}
.hero > .content {
  align-self: center;
  width: 50%;
  padding-left: 3vw;
}
.content > h1 {
  font-size: 60px;
  font-weight: 500;
  margin-bottom: 30px;
}
.content > h2 {
  font-size: 30px;
  margin-bottom: 50px;
  font-family: 300;
}

.Github-btn {
  text-align: start;
}
.Contact-btn {
  text-align: center;
  margin-right: 10px;
}

.NavIcon {
  color: white;
  text-decoration: none;
  font-size: 16px;
  margin-bottom: 30px;
}
</style>
