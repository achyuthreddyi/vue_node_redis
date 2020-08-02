
const express = require('express')
const cors = require('cors')

//routes
const todoroutes = require('./routes/todos')
const taskroutes= require('./routes/tasks')


const app = express()
//middleware
app.use(cors())
app.use(express.json())

app.use('/todos',todoroutes)

app.use('/todos',taskroutes)


app.listen(3000,()=> console.log(`app working in 3000`))