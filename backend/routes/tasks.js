const express = require('express')
const router = express.Router()

const { taskqueries } = require('../controllers/tasksController')


//listing all the tasks of a particular todo
router.get('/:todoid/tasks',taskqueries.getAlltasks)

// creating the route to add the tasks

router.post('/:todoid/tasks',taskqueries.createTasks)

// updating the stuff

router.put('/:todoid/tasks/:taskid',taskqueries.updatetask)

// delteing a tasks
router.delete('/:todoid/tasks/:taskid',taskqueries.deletetask)



module.exports = router;
// :taskid/subtasks