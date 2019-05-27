import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Settings from './views/Settings.vue'
import SearchResult from './views/SearchResult.vue'
import ProfileView from './views/ProfileView.vue'
import Dashboard from './views/Dashboard.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home

    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/settings/:id',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/profile/:id',
      name: 'ProfileView',
      component: ProfileView
    },
    {
      path: '/search',
      name: 'Search', // Use $route.query to fetch queries
      component: SearchResult
    }

  ]
})
