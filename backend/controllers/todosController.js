const { todoCommands } = require ('../models/todo')

const  todoqueries = {}

todoqueries.getAlltodos = async (req,res) =>{
    try {
        const todoIds = await todoCommands.lrange('todoIds',0,-1)

        if(todoIds.length ===0){
            return res.status(200)
                        .json({
                            message:'no todos added'
                        })
        }
        const todos =[]
        for (const id of todoIds){
            const todoname = await todoCommands.hget(id,'todoName')
            todos.push({todoId: id, todoname})
        }
        res.status(200)
            .json(todos)
        
    } catch (e) {
        res.status(500)
            .json({
                message:'cant get todos'
            })        
    }
}

// creating a new todo

todoqueries.createTodo = async (req, res) =>{
    try {
        const todoName = req.body.todoName
        let id

        if(await todoCommands.exists('todoIdcounter')){
            id = await todoCommands.incr('todoIdcounter')
        }
        else{
            await todoCommands.set('todoIdcounter',0)
            id = await todoCommands.get('todoIdcounter')
        }

        await todoCommands.rpush('todoIds',id)

        await todoCommands.hset(id,'todoName',todoName,'tasks','[]')

        res.status(201)
            .json({
                todoId:id,
                todoName
            })
        
    } catch (error) {
        res.status(500)
            .json({
                message:'cant add todos'
            })        
    }
}

// updating a new Todo

todoqueries.updateTask = async (req, res) =>{
    try {
        const todoId = req.params.todoid
        const todoName = req.body.todoName
        console.log(todoId,todoName);

        const todo = await todoCommands.hexists(todoId,'todoName')

        if(!todo){
            return res.status(404)
                .json({
                    message:" there is no such todos"
                })
        }
        await todoCommands.hset(todoId,'todoName',todoName)

        res.status(200)
            .json({
                message: `todo has been updated with id ${todoId} `
            })

        
    } catch (error) {
        res.status(500)
            .json({
                message:'cant update todos'
            }) 
        
    }
}

todoqueries.deleteTodo = async (req,res) =>{
    try {
        const todoId = req.params.todoid

        const deleteTodo = todoCommands.lrem('todoIds',0,todoId)

        if(!deleteTodo){
            return res.status(404)
                    .json({
                        message:"no such tod exists in the database"
                    })
        }
        await todoCommands.hdel(todoId,'todoName')
        await todoCommands.hdel(todoId,'tasks')

        res.status(200)
            .json({
                message: `todo deleted with ${todoId}`
            })
        
    } catch (error) {
        res.status(500)
            .json({
                message:'cant delete todos'
            }) 
        
        
    }
}

module.exports = { todoqueries }