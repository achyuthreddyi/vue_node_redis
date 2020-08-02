 /* eslint-disable */
<template>
     <form  @submit.prevent="addTodo(newTodo)" class="c0l-12 col-lg-6">
      <input v-model = "newTodo" type="text" placeholder="Enter a new item to your bag!!" class="form-control">
  </form>
  <!-- @submit.prevent="addTodo()" -->
</template>

<script>
import { mapActions } from "vuex";
export default {
    data(){
        return{
            newTodo:""
        }
    },
    methods :{
        ...mapActions(['addTodo']),
        // addItem(){
        //     console.log('coming here');
        //     addTodo(newTodo)
        // }

    }    

}
</script>

