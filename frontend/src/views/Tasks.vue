<template>
<div> 
  <h1>
    tasks page     
  </h1>
  <form  @submit.prevent="addTask(newTask)" class="c0l-12 col-lg-6">
      <input v-model = "newTask" type="text" placeholder="Enter a new task to your bag!!" class="form-control">
  </form>




  <div class = "tasks">
    <div v-for="(task , index) in taskList" :key="index" class="task" >

      <!-- <p  v-if="!isEditing" @click="toggleComplete(task.id)" :class="{'completed':(task.completed == true)}"> 
          {{ task.taskName }}
      </p> -->
      <p @click="toggleComplete(task.id)" >
          <Task
        :class="{'completed':(task.completed == true)}"
        :taskname = "task.taskName"
        :taskId = "task.id"
        :priority = "task.priority"
        @on-edit = "edittask(task.id,$event)"
        @on-change = "change(task.id,$event)"          
      > 
      </Task> 
      </p>
    
      <i class="fa fa-trash" @click="deleteTask(task.id)" aria-hidden="true"></i>
     

  </div>
  </div>
  


</div>
</template>

<script>
import axios from 'axios'
import Task from '../components/Task'
// import {mapGetters , mapActions} from 'vuex';
export default {
  data(){
    return{
      taskList:[],
      newTask:"",
      isEditing : false,
      newTaskString:""
    }
  },
  components:{
    Task
  },
  methods :{
    async fetchTasks() {      
      const response = await axios.get(`http://localhost:3000/todos/${this.$route.params.todoId}/tasks`)
      // console.log(response.data);
      this.taskList = response.data
    },
    async deleteTask(id){
      await axios.delete(`http://localhost:3000/todos/${this.$route.params.todoId}/tasks/${id}`)

    },
    async addTask(newTask){
      const response = await axios.post(`http://localhost:3000/todos/${this.$route.params.todoId}/tasks`,{taskName:newTask})
      console.log(response.data);
    },
    async toggleComplete(id){      
      await axios.put(`http://localhost:3000/todos/${this.$route.params.todoId}/tasks/${id}`,{completed: true})
    },
    async edittask(id,newTask){
      await axios.put(`http://localhost:3000/todos/${this.$route.params.todoId}/tasks/${id}`,{taskName:newTask})
    },
    async change(id,value){
      await axios.put(`http://localhost:3000/todos/${this.$route.params.todoId}/tasks/${id}`,{priority:value})

    }

  },
  
  created(){
    this.fetchTasks()
  }
  

}
</script>

<style>
.tasks{
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.task {
  border: 1px solid #ccc;
  background: #EEC213 ;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}

i {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: red;
  cursor: pointer;
}
p{
  cursor: pointer;
}
.completed {
    text-decoration :line-through;
}

</style>