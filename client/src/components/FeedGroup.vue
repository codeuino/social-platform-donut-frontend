<template>
        <div  :class="$store.state.darkMode ? 'content-dark' : 'content-light' ">
            <div v-if="RouteName === 'ProjectFeed' || RouteName === 'Feed' || RouteName === 'EventFeed'" class="main-feed" :class="$store.state.darkMode ? 'content-dark' : 'content-light' ">
            <!-- Feed start-->
            <b-modal size="xl" ok-only ok-variant="secondary" ok-title="Cancel"  id="modal-2"  title="Create A Project">
                    <CreateProject />
            </b-modal>
            <b-modal size="xl" ok-only ok-variant="secondary" ok-title="Cancel"  id="modal-3"  title="Create An Event">
                    <CreateEvent />
            </b-modal>
            <b-modal size="xl" ok-only ok-variant="secondary" ok-title="Cancel"  id="modal-4"  title="Create A Post">
                    <CreatePost />
            </b-modal>
            <div class=" d-flex post-card-create" :class="$store.state.darkMode ? 'content-dark-1' : 'content-light-1' " >
              <button v-b-modal.modal-4 v-if="RouteName === 'Feed'" class="btn btn-md ml-1 text-white" style="background-color:#618abb">Create Post</button>
              <button v-b-modal.modal-2  v-if="RouteName === 'ProjectFeed' || RouteName === 'Feed'" class="btn btn-md text-white ml-1" style="background-color:#b58f43">Create Project</button>
              <button v-b-modal.modal-3 v-if="RouteName === 'EventFeed' || RouteName === 'Feed'"  class="btn btn-md text-white ml-1" style="background-color:#b84c37">Create Event</button>
            </div>
            <Project :key="index" v-for="(post,index) in postsArray" :post="post"/>
            <!--     Feed end -->
            </div>

          <div v-else class="main-feed-2" :class="$store.state.darkMode ? 'content-dark' : 'content-light' ">
                        <Project :key="index" v-for="(post,index) in postsArray" :post="post"/>
          </div>
        </div>

</template>

<script>
import CreateProject from '@/components/CreateProject.vue'
import CreatePost from '@/components/CreatePost.vue'
import CreateEvent from '@/components/CreateEvent.vue'
import Project from '@/components/Project.vue'
export default {
  name: 'FeedGroup',
  props: {
    postsArray: Array
  },
  components: {
    Project,
    CreateProject,
    CreateEvent,
    CreatePost
  },
  data () {
    return {
      isloading: true,
      postsGroups: []
    }
  },
  computed: {
    RouteName () {
      return this.$route.name
    }
  }
}
</script>

<style scoped>
.content-light {
    background-color:#edf2fb;
}
.content-dark {
  background-color: #121212;
}
.main-feed {
  min-height:98vh;
  max-width:65vw;
  margin-left:6vw;
  column-count: 2;
  padding:10px;
  padding-top:20px;
}
.main-feed-2 {
  min-height:98vh;
  margin-left:35vw;
  margin-right: 20px;
  column-count: 2;
  padding:10px;
  padding-top:40px;

}
.content-light-1 {
  background-color:#c0dde4;
}
.content-dark-1 {
  background-color: #1A1A1B;

}
.post-card-create {
  break-inside: avoid;
  border-radius: 20px;
  padding:20px;
  padding-left:10px;
  max-height:80px;
  margin-bottom:10px;
}
.post-card-create > button {
  font-weight: 600;
}
@media (min-width:1480px) {
  .main-feed {
    margin-left:5vw;
    max-width:68vw;
  }
}
@media (min-width:1800px) {
  .main-feed {
    margin-left:6vw;
    max-width:68vw;
  }
}
@media (max-width:1110px) {
  .main-feed {
    column-count:1;
  }
}
@media (max-width:850px) {
  .main-feed {
    margin-left:12vw;
    max-width:70vw;
  }
}
@media (max-width:710px) {
  .main-feed {
    margin-left:13vw;
  }
}
@media (max-width:546px) {
  .post-card-create {
    display:flex;
    flex-direction:column;
    max-height:300px;

  }
.post-card-create > button {
    margin-bottom:10px;
  }
.post-card-create > button:hover {
  transform: scale(1.1);
}
}
@media screen and (max-width: 1265px) {
  .main-feed {
    max-width:60vw;
  }
}
@media screen and (max-width: 860px) {
  .main-feed {
    margin-left:11vw;
    max-width:55vw;
  }
}
@media screen and (max-width: 1392px) {
  .main-feed {
    max-width:64vw;
  }
}

@media (max-width:1067px) {
  .main-feed {
    margin-left:9vw;
    max-width:62vw;
  }
}
@media (max-width:795px) {
  .main-feed {
    margin-left:10vw;
    max-width:62vw;
  }
}
@media (max-width:707px) {
  .main-feed {
    float:right;
    margin-left:0;
    max-width:80vw;
  }
}
@media (max-width:546px) {
  .main-feed {
    float:right;
    margin-left:0;
    max-width:70vw;
  }
}
</style>
