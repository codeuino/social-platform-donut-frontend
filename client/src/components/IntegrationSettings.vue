<template>
    <div>
        <b-card>
            <b-card-header>
                Integration Settings
            </b-card-header>
            <b-card-body>
                <div>
                <h3 class="lead">Import from Github</h3>
                <hr>
                <div v-if="githubId == '' ">
                    <a href="http://localhost:3000/auth/github">
                    <button class="btn btn-lg btn-danger text-white">
                    Import from Github  <v-icon class="text-white ml-1"> fab fa-github</v-icon>
                    </button>
                </a>
                <p style="font-size:12px;opacity:0.7" class="mt-2">Note: If you're not integrated Github, you'll be redirected to feed page. Then you're good to go.</p>
                <p style="font-size:12px;opacity:0.7" class="mt-2">Note: Make sure your donut and github email are same.</p>

                </div>
                <div v-else>
                <p style="opacity:0.7" class="mt-2">Note: Select the repos you want to Import.</p>
                <b-container>
                  <div style="max-height:350px;overflow-y:scroll">
                    <div @click="toggleBtn(repo.clicked,index)" v-for="(repo,index) in repos" v-bind:key="index">
                    <b-card :class="repo.clicked ? 'bg-success text-white' : ''">
                        <b-card-title>{{repo.repo.name}}</b-card-title>
                    </b-card>
                </div>
                  </div>
                  <br>
                  <button :disabled="disabled" @click="addProjects" class="btn btn-lg btn-primary">Import</button>
                </b-container>
                </div>
                </div>
            </b-card-body>
        </b-card>
        <b-card class="loader" v-if="isLoading">
          <center>
            <b-spinner class="m-5" label="Busy"></b-spinner>
            <br>
            Importing Your Repositories
          </center>
        </b-card>
    </div>
</template>

<script>
import _ from 'lodash'
import showdown from 'showdown'
export default {
  data () {
    return {
      isLoading: false,
      disabled: true,
      githubId: '',
      clientID: '38c595213c81513a05c7',
      APIKey: 'd30f53f9adbea5728f0641b267bf0a6748fdc521',
      UserName: '',
      repos: [],
      selectedRepos: []
    }
  },
  components: {
  },
  name: 'IntegrationSettings',
  async created () {
    const response = await fetch('http://localhost:3000/profile/getDetails', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.$session.get('token')

      }

    })
    const content = await response.json()
    this.githubId = await content.user.githubId
    if (this.githubId !== '') {
      const resp = await fetch(`https://api.github.com/users/${this.githubId}/repos`)
      const con = await resp.json()
      var temp = []
      for (var i = 0; i < con.length; i++) {
        temp.push({ repo: con[i], clicked: false })
      }
      this.repos = temp
    }
    this.disabled = false
  },
  methods: {
    toggleBtn (btnState, index) {
      this.repos[index].clicked = !btnState
      if (!btnState) {
        this.selectedRepos.push(this.repos[index].repo)
      } else {
        var temp = _.reject(this.selectedRepos, (e) => {
          return e.name === this.repos[index].repo.name
        })
        this.selectedRepos = temp
      }
    },
    async addProjects () {
      this.isLoading = true
      var converter = new showdown.Converter()
      for (var i = 0; i < this.selectedRepos.length; i++) {
        // now we have to fetch readme and convert it to html! and wrap around p tag
        var resp = await fetch(`https://api.github.com/repos/${this.githubId}/${this.selectedRepos[i].name}/contents/README.md`)
        const readmeObj = await resp.json()
        var res = await fetch(readmeObj.download_url)
        var readme = await res.text()
        var readmeHTML = converter.makeHtml(readme)
        readmeHTML = `<p>${readmeHTML}</p>`
        const Project = {
          card_title: this.selectedRepos[i].name,
          description: this.selectedRepos[i].description,
          card_text: readmeHTML,
          Lang: [this.selectedRepos[i].language],
          image: '',
          github: this.selectedRepos[i].url
        }
        console.log(Project)
        const respProject = await fetch('http://localhost:3000/projects/addProject',
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': this.$session.get('token')
            },
            body: JSON.stringify(Project)
          })
        const content = await respProject.json()
        this.isLoading = false
      }
    }
  }

}
</script>

<style scoped>
.loader {
  position: absolute;
  top:20%;
  left:30%;
}
</style>
