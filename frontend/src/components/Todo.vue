<template>
  <div>
      
      <p v-if="!isEditing">
        <router-link :to='`/todo/${todoId}`' > {{ todoname }} </router-link>
      </p>
      
       <form v-else @submit.prevent = "endEditing()">  
        <input @blur="startEditing()" type="text" v-model="newTodoString" />
        <!-- </textarea> -->
        <!-- @blur="startEditing()"  -->
        <!--  @blur="editTodo(todoId,newTodoString)" -->
        <!--  @submit.prevent="editTodo(todoId,newTodoString)" -->
      </form>

      <button @click="startEditing()">Edit</button>

  </div>

</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "Todo",
    props:{
        todoname:String,
        todoId:String
        
    },
    data(){
        return{
            isEditing : false,
            newTodoString: "",
            
        }
    },
    methods :{
        ...mapActions(['editTodo']),
        startEditing(){
            if(!this.isEditing){
                this.newTodoString = this.todoname;
                this.isEditing = true
            }else{
                this.endEditing();
            }

        },
        endEditing(){
            this.isEditing = false
            this.$emit('on-edit',this.newTodoString)
        }

        ,
    
    },
    // computed :{
    //     dataa: function () {
    //         this.newTodoString = 
    //     }       

    // }

}
</script>

<style>
button {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: red;
  cursor: pointer;
}

</style>