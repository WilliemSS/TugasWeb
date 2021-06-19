import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import auth from './components/auth.vue'
import userList from './components/userList.vue'
import addUser from './components/addUser.vue'
import todoList from './components/todoList.vue'
import addTodo from './components/addTodo.vue'


Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [ 
  {
    name: 'Index',
    path: '/',
    component: auth
  },
  {
    name: 'User',
    path: '/user',
    component: userList
  },
  {
    name: 'AddUser',
    path: '/addUser',
    component: addUser
  },
  {
    name: 'Todo',
    path: '/todo',
    component: todoList
  },
  {
    name: 'AddTodo',
    path: '/addTodo',
    component: addTodo
  },
];

const router = new VueRouter({ mode: 'history', routes: routes })

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')   