import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Task from "../views/Tasks.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path:"/todo/:todoId",
    name: "Task",
    component:Task

  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
