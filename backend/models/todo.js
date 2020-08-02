const redis = require('redis')
const client = redis.createClient()
const { promisify } = require('util')

client.on('error', (error) => {
  console.error(error)
})

client.on('connect', () => {
  console.error('Connected to Reddis on port 6379')
})

const todoCommands = {}

todoCommands.get = promisify(client.get).bind(client)
todoCommands.set = promisify(client.set).bind(client)
todoCommands.incr = promisify(client.incr).bind(client)
todoCommands.exists = promisify(client.exists).bind(client)
todoCommands.rpush = promisify(client.rpush).bind(client)
todoCommands.lrange = promisify(client.lrange).bind(client)
todoCommands.lrem = promisify(client.lrem).bind(client)
todoCommands.hset = promisify(client.hset).bind(client)
todoCommands.hgetall = promisify(client.hgetall).bind(client)
todoCommands.hget = promisify(client.hget).bind(client)
todoCommands.hexists = promisify(client.hexists).bind(client)
todoCommands.hdel = promisify(client.hdel).bind(client)

module.exports = { todoCommands }
