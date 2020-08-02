<template>
<div>
    <p v-if="!isEditing">
        {{ taskname }}
    </p>
    <form v-else @submit.prevent = "endEditing">
        <input @blur = "startEditing()" v-model="newTaskString" type="text">
    </form>

    <button @click="startEditing()">Edit</button>
    <select v-model="selected" @change="changePriority()">
        <option disabled value="">click here to change the priority</option>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
    </select>
        
</div>
  
</template>

<script>
// import Axios from 'axios';
export default {
    props:{
        taskname:String,
        priority:Number,
        taskId:String
    },
    data(){
        return {
            isEditing:false,
            newTaskString: "",
            selected:''
        }
       
    },
    methods:{
        startEditing(){
            if(!this.isEditing){
                this.newTaskString = this.taskname;
                this.isEditing = true
            }else{
                this.endEditing();
            }

        },
        endEditing(){
            this.isEditing = false
            this.$emit('on-edit',this.newTaskString)
        },
        async changePriority(){
            const basis = {
                "High":3,
                "Medium":2,
                "Low":1
            }
            const value = basis[this.selected]
            this.$emit('on-change',value)
            
            
        }
    }


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
select{
    position: relative;
  bottom: 10px;
  /* left: 5px; */
  color: red;
  cursor: pointer;
}


</style>