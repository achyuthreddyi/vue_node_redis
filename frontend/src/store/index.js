import Vue from "vue";
import Vuex from "vuex";
import todos from './modules/todos'
// import tasks from './modules/tasks'

Vue.use(Vuex);

export default new Vuex.Store({  
  modules: {
    todos,
    // tasks
  }
});
