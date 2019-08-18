<template>
    <div class="recent" :class="$store.state.darkMode ? 'content-dark' : 'content-light' ">
    <div class="recent-heading">
      <h4>Recents</h4>
    </div>
    <div class="recent-feed">

      <div class="recent-post">
        <h4>Hello World</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
      </div>

      <div class="recent-post">
        <h4>Hello World</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
      </div>

      <div class="recent-post">
        <h4>Hello World</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
      </div>
      <div class="recent-post">
        <h4>Hello World</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
      </div>

      <div class="recent-post">
        <h4>Hello World</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
      </div>

      <div class="recent-post">
        <h4>Hello World</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Recent'
}
</script>

<style scoped>
.content-light {
  background-color:white;
}
.content-dark {
  background-color: #1A1A1B;
}
.recent {
  border-radius: 5px;
  position:fixed;
  top:106px;
  bottom:20px;
  right:10px;
  min-height:75vh;
  min-width:24vw;
  max-width:26vw;
  padding:20px;
  padding-top:40px;
}
.recent-heading > h4 {
  font-size:18px;
  margin-bottom:40px;
  color:grey;
  font-weight:600;
}

.recent-post {
  margin-bottom:30px;
}

.recent-post > h4 {
  font-size: 18px;
  color:#618abb;
  font-weight:600;
}

.recent-post > p {
  font-size: 16px;
  color:#6d7786
}
@media (max-width:710px) {
  .recent {
    display:none;
  }
}
@media (min-width:2000px) {
  .recent {
    max-width:16px;
  }
}

</style>
