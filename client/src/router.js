import Vue from 'vue'
import Router from 'vue-router'
import Settings from './views/Settings.vue'
import Search from './views/SearchResult.vue'
import ProfileView from './views/ProfileView.vue'
import Dashboard from './views/Dashboard.vue'
import About from './views/About.vue'
import Feed from './views/Feed.vue'
import Welcome from './views/Welcome.vue'
import Portfolio from './views/Portfolio.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Feed

    },
    {
      path: '/welcome', // Query source=login for login page, source=signuo for Signup page
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/dashboard/:id',
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
      component: Search
    },
    {
      path: '/portfolio/:id',
      name: 'Portfolio',
      component: Portfolio
    }

  ]
})
