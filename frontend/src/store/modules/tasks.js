import axios from 'axios'

const state = {
    tasks: []
};

const getters = {
    allTasks : (state) => state.tasks
}

const actions = {
    async fetchTasks ( {commit} , id ){
        const response = await axios.get(`http://localhost:3000/todos/${id}/tasks`)
        commit ('setTasks',response.data)

    }

}
const mutations = {
    setTasks:(state,tasks) => state.tasks = tasks
}

export default {
    state,getters,actions, mutations
}