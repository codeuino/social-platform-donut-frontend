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
import ProjectView from './views/ProjectView.vue'
import Home from './views/Home.vue'
import Event from './views/Event.vue'
import EventFeed from './views/EventFeed.vue'
import EventForm from './views/EventForm.vue'
import Signup2 from './views/CompleteSignup.vue'
import LikedProjects from './views/LikedProjects.vue'
import ProjectFeed from './views/ProjectFeed.vue'
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
      path: '/signup/2',
      name: 'Signup2',
      component: Signup2
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
      path: '/project/:post_id',
      name: 'ProjectView',
      component: ProjectView
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
      path: '/projects/liked/:id',
      name: 'LikedProjects',
      component: LikedProjects

    },
    {
      path: '/projects/:id',
      name: 'ProjectFeed',
      component: ProjectFeed
    }
  ]
})
