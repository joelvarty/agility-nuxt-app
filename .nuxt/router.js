import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1707dbcc = () => interopDefault(import('../agility/AgilityPage.vue' /* webpackChunkName: "" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "*",
      component: _1707dbcc,
      name: "custom"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
