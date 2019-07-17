import Vue from 'vue'
import Router from 'vue-router'
import Settings from './views/Settings.vue'
import Search from './views/SearchResult.vue'
import ProfileView from './views/ProfileView.vue'
import Dashboard from './views/Dashboard.vue'
import About from './views/About.vue'
import Feed from './views/Feed.vue'
import SignupView from './views/SignupView.vue'
import LoginView from './views/LoginView.vue'
import Portfolio from './views/Portfolio.vue'
import PostView from './views/PostView.vue'
import Home from './views/Home.vue'
import Event from './views/Event.vue'
import EventFeed from './views/EventFeed.vue'
import EventForm from './views/EventForm.vue'

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
      path: '/feed/:id',
      name: 'Feed',
      component: Feed

    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignupView
    },
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView
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
    },
    {
      path: '/post/:post_id',
      name: 'PostView',
      component: PostView
    },
    {
      path: '/events/event/:id',
      name: 'Events',
      component: Event
    },
    {
      path: '/events/feed',
      name: 'EventFeed',
      component: EventFeed
    },
    {
      path: '/events/create',
      name: 'EventForm',
      component: EventForm
    }
  ]
})
