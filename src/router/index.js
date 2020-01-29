import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name:'home',
    component: Home,
    children:[
      {
        path: '',
        name: 'posts',
        component: () => import(/* webpackChunkName: "post-detail" */ '../views/Posts.vue')
      },
      {
        path: '/cats',
        name: 'cats',
        component: () => import(/* webpackChunkName: "about" */ '../views/Cats.vue')
      },
      {
        path: '/dogs',
        name: 'dogs',
        component: () => import(/* webpackChunkName: "about" */ '../views/Dogs.vue')
      },
      {
        path: '/other',
        name: 'other',
        component: () => import(/* webpackChunkName: "about" */ '../views/Other.vue')
      },
      {
        path: '/my-posts',
        name: 'my-posts',
        component: () => import(/* webpackChunkName: "about" */ '../views/MyPosts.vue')
      },
      {
        path: 'post/:id',
        props: true,
        name: 'post-detail',
        component: () => import(/* webpackChunkName: "post-detail" */ '../views/PostDetail.vue')
      }
    ]
  },
  {
    path: '/new-post',
    name: 'new-post',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewPost.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue')
  },
  {
    path: '/change-password',
    name: 'change-password',
    component: () => import(/* webpackChunkName: "about" */ '../views/ChangePassword.vue')
  },
  {
    path: '/delete-account',
    name: 'delete-account',
    component: () => import(/* webpackChunkName: "about" */ '../views/DeleteAccount.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import(/* webpackChunkName: "about" */ '../views/ForgotPassword.vue')
  },
  {
    path: '/edit-post/:id',
    props: true,
    name: 'edit-post',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditPost.vue')
  },
  {
    path: '/user-profile',
    name: 'user-profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserProfile.vue')
  },
  {
    path: '/edit-profile',
    name: 'edit-profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditUserProfile.vue')
  },
  {
    path: '/stats',
    name: 'stats',
    component: () => import(/* webpackChunkName: "about" */ '../views/Stats.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
