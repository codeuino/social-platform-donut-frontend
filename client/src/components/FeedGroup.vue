<template>
        <div  :class="$store.state.darkMode ? 'content-dark' : 'content-light' ">

            <b-container >
            <div v-if="isloading" class="text-center">
                <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" type="grow"></b-spinner>
                <h4>Please Wait Do not Refresh</h4>
            </div>
            <div v-if="!isloading">
                <b-container>
                  <div class="feed-group">
                    <Post v-for="(project, index) in postsArray" v-bind:key="index" :post="project" />
                  </div>
                </b-container>

            </div>
            </b-container>
        </div>

</template>

<script>

import Post from './Post'
export default {
  name: 'FeedGroup',
  props: {
    postsArray: Array
  },
  components: {
    Post
  },
  data () {
    return {
      isloading: true,
      postsGroups: []
    }
  },
  mounted () {
    console.log(this.postsArray)
    var index = 0
    var groups = []
    var group = []
    this.postsArray.forEach(function (i) {
      if (index % 2 === 0) {
        group = []
        group.push(i)
        groups.push(group)
      } else {
        group.push(i)
      }
      index++
    })
    this.postsGroups = groups // in the above code i took a array of objects (posts), and grouped them into group of two, so I can inject them as props easily. Grid issues in Vue bootstrap :)
    this.isloading = false
  }
}
</script>

<style scoped>
.content-light {
    background-color: #e9ecef;
}
.content-dark {
  background-color: #121212;
}
.feed-group {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 10px;
}
</style>
