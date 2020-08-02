 /* eslint-disable */
import axios from 'axios'

const state = {
    todos: []
};


const getters = {
    allTodos : (state) => state.todos
}

const actions =  {
    async fetchTodos( {commit} ){
        const response = await axios.get('http://localhost:3000/todos/')
        commit('setTodos', response.data)
    },
    async deleteTodo ( { commit } , id ){
        const response = await axios.delete(`http://localhost:3000/todos/${id}`)
        commit ('removeeTodos' , id)
    },
    async addTodo ( {commit} , todo ){
        const response = await axios.post ('http://localhost:3000/todos/',{todoName:todo})
        commit ('addTodo' , todo )
    },
    async editTodo ( {commit},id, todo){
        console.log('coming in the state');
        console.log('id :  ' ,id , " todo : " , todo );
        const response = await axios.put (`http://localhost:3000/todos/${id}`,{todoName:todo})
    }
}
const mutations= {
    setTodos : (state,todos) => state.todos = todos,
    removeeTodos: (state, id) => state.todos = state.todos.filter(todo => todo.id != id),
    addTodo: (state , todo ) => state.todos = state.todos.unshift(todo)
}

export default{
    state, getters,actions,mutations
}