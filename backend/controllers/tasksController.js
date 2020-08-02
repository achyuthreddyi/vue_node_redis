const { todoCommands } = require('../models/todo')

const taskqueries = {}

taskqueries.getAlltasks = async(req,res) =>{
    try {

        const todoid = req.params.todoid
        console.log(todoid); 
        // console.log('coming');       
        const todo = await todoCommands.exists(todoid)
        console.log('todo',todo);
        console.log('coming');

        if(!todo){
            return res.status(404)
                .json({
                    message :' bo such todo'
                })
        }

        const tasks = JSON.parse( await todoCommands.hget(todoid,'tasks'))
        console.log('tasks',tasks);
        if(tasks.length === 0){
            return res.status(200)
                    .json({
                        message : 'No tasks exists'
                    })
        }

        res.status(200)
            .json(tasks)


        
    } catch (error) {
        res.status(500)
            .json({
                message: 'cant get any tasks of particular todo'
            })
        
    }
}




taskqueries.createTasks = async(req,res) =>{
    try {
        const todoId = req.params.todoid
        const taskName = req.body.taskName

        
        console.log(todoId,taskName);

        console.log('coming');
        const todo = await todoCommands.exists(todoId)
        console.log('coming');
        console.log(todo);

        if(!todo) {
            return res.status(404)
                .json({
                    message: 'todo does not exists'
                })
        }
        let id;

        if(await todoCommands.exists('taskIdcounter')){
            id = await todoCommands.incr('taskIdcounter')
        }
        else{
            await todoCommands.set('taskIdcounter',0)
            id = await todoCommands.get('taskIdcounter')
        }

        const tasks = JSON.parse(await todoCommands.hget(todoId,'tasks'))

        const newTask = {
            id :id,
            taskName: taskName,
            scheduled: 'null',
            completed:false,
            priority:0,
            note:''
        }
        tasks.push(newTask)
        
        await todoCommands.hset(todoId,'tasks', JSON.stringify(tasks)) 
        
        res.status(201)
            .json({
                message :`task has been created successfully`
            })
        
    } catch (error) {
        res.status(500)
            .json({
                message : 'CAnt add tasks for the particular todo'
            })
        
    }
}

// to change the priority and toggle the completestatus

taskqueries.updatetask  = async(req,res) =>{
    try {
        // console.log('coming');
        const todoId = req.params.todoid
        // console.log(todoId);
        const taskId = req.params.taskid
        // console.log(taskId);

        const jsonbody = req.body
        const keytoupdate = Object.keys(jsonbody)[0]
        // const newvalue = Object.values(jsonbody)
        const newvalue = jsonbody[keytoupdate]

        const todo = await todoCommands.exists(todoId)

        if(!todo){
            return res.status(404)
                    .json({
                        message : " no such todo"
                    })
        }

        const tasks = JSON.parse( await todoCommands.hget(todoId,'tasks'))
        const index = tasks.findIndex( task => task.id == taskId)

        if(index !== -1){
            Object.assign(tasks[index] , {[keytoupdate] : newvalue})

            await todoCommands.hset(todoId,'tasks', JSON.stringify(tasks))
            return res.status(200)
                    .json({
                        message: `task has been modified with ${todoId} ${taskId}`
                    })
        }

        return res.status(404)
                    .json({
                        message :'cant modify the tasks'
                    })
        
        
    } catch (error) {
        res.status(500)
            .json({
                message : `cant update the task`
            })
        
    }
}

taskqueries.deletetask = async(req,res) =>{
    try {
        // console.log('coming');
        const todoId = req.params.todoid
        // console.log(todoId);
        const taskId = req.params.taskid
        // console.log(taskId);

        const todo = await todoCommands.exists(todoId)

        if(!todo){
            return res.status(404)
                    .json({
                        message : 'todo does not exists'
                    })
        }
        const tasks = JSON.parse(await todoCommands.hget(todoId,'tasks'))

        const index = tasks.findIndex( task => task.id == taskId)

        if(index !== -1){
            tasks.splice(index , 1)

            await todoCommands.hset(todoId , 'tasks', JSON.stringify(tasks))
            return res.status(200).json({
                message:`tasks has deleted ${taskId}`
            })
        }

        res.status(404).json({
                message:'cant delete the tasks'
        })
        
    } catch (error) {
        res.status(500)
            .json({
                message : `cant delete teh tasks`
            })        
    }
}

module.exports = { taskqueries }