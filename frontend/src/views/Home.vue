 /* eslint-disable */
<template>
  <div>
    <CreateElement/>
     <div class="todos">
    
    <div v-for="(todo , index ) in allTodos" :key="index" class="todo" >
      <!-- <p> {{todo.todoname}} </p> -->
       
      <Todo 
        :todoname = "todo.todoname"
        :todoId= "todo.todoId"
        @on-edit = "edittodo(todo.todoId,$event)"
      />
      
      

      <i class="fa fa-trash" @click="deleteTodo(todo.todoId)" aria-hidden="true"></i>
      <form v-if="isEditing"> 
        <input type="text" value = todo.todoname>
      </form>
      <!-- <button @click="toggleEditing">Edit</button> -->
      
    </div>

  </div>

  </div>
 
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import { mapGetters , mapActions } from 'vuex';
import CreateElement from '../components/CreateElement'
import Todo from "../components/Todo"


export default {
  name: "Home",
  data(){
    return{
      
    }
  },
  components: {
    CreateElement,
    Todo
  },
  methods :{
    ...mapActions(['fetchTodos','deleteTodo','editTodo']),
    toggleEditing(){
      this.isEditing = !this.isEditing
    },
    async edittodo(id,newTodo){
      // console.log(id , newTodo);
      // editTodo(id,newTodo)
       const response = await axios.put (`http://localhost:3000/todos/${id}`,{todoName:newTodo})
       console.log(response);
    }
   
    
  },
  computed:mapGetters(['allTodos']),
  created(){
    this.fetchTodos()
  }
};
</script>

<style scoped>
.todos {
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.todo {
  border: 1px solid #ccc;
  background: #41b883;
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
button {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: red;
  cursor: pointer;
}
.legend {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}
.complete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #35495e;
}
.incomplete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #41b883;
}
.is-complete {
  background: #35495e;
  color: #fff;
} 
@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
}


</style>
