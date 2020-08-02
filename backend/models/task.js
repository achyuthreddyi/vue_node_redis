const redis = require('redis')
const client = redis.createClient()
const { promisify } = require('util')

client.on('error', (error) => {
  console.error(error)
})

client.on('connect', () => {
  console.error('Connected to Reddis on port 6379')
})

const taskCommands = {}

taskCommands.get = promisify(client.get).bind(client)
taskCommands.set = promisify(client.set).bind(client)
taskCommands.incr = promisify(client.incr).bind(client)
taskCommands.exists = promisify(client.exists).bind(client)
taskCommands.rpush = promisify(client.rpush).bind(client)
taskCommands.lrange = promisify(client.lrange).bind(client)
taskCommands.lrem = promisify(client.lrem).bind(client)
taskCommands.hset = promisify(client.hset).bind(client)
taskCommands.hgetall = promisify(client.hgetall).bind(client)
taskCommands.hget = promisify(client.hget).bind(client)
taskCommands.hexists = promisify(client.hexists).bind(client)
taskCommands.hdel = promisify(client.hdel).bind(client)

module.exports = { taskCommands }
