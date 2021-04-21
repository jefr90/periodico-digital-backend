const ws = require("ws")
const { subscribeToTopic } = require("./pubSub.js")
const { getAllTopics } = require("../mongodb/models")

const startServer = () => {
  return new ws.Server({ noServer: true })
}

const startWebsocket = (wsServer1, wsServer2, wsServer3, wsServer4) => {
  wsServer1.on("connection", async (socket) => {
    socket.on("message", (message) => {
      console.log(`Message from frontend: ${message}`)
      socket.send("something")
    })
    let topic = 1
    // create a function to receive the topic
    var mySubscriber = (topic, content) => {
      console.log(`Sending message from subscription:`)
      console.log(`topic:${topic}`, `content:${content}`)
      socket.send(JSON.stringify({ topic, content }))
    }
    // add the function to the list of subscribers to a particular topic
    // we're keeping the returned token, in order to be able to unsubscribe
    // from the topic later on
    let token = subscribeToTopic(topic, mySubscriber)

    socket.send(`Subscriber tokens: ${token}`)
  })

  wsServer2.on("connection", async (socket) => {
    socket.on("message", (message) => {
      console.log(`Message from frontend: ${message}`)
      socket.send("something")
    })
    let topic = 2
    // create a function to receive the topic
    var mySubscriber = (topic, content) => {
      console.log(`Sending message from subscription:`)
      console.log(`topic:${topic}`, `content:${content}`)
      socket.send(JSON.stringify({ topic, content }))
    }
    // add the function to the list of subscribers to a particular topic
    // we're keeping the returned token, in order to be able to unsubscribe
    // from the topic later on
    let token = subscribeToTopic(topic, mySubscriber)

    socket.send(`Subscriber token: ${token}`)
  })

  wsServer3.on("connection", async (socket) => {
    socket.on("message", (message) => {
      console.log(`Message from frontend: ${message}`)
      socket.send("something")
    })
    let topic = 3
    // create a function to receive the topic
    var mySubscriber = (topic, content) => {
      console.log(`Sending message from subscription:`)
      console.log(`topic:${topic}`, `content:${content}`)
      socket.send(JSON.stringify({ topic, content }))
    }
    // add the function to the list of subscribers to a particular topic
    // we're keeping the returned token, in order to be able to unsubscribe
    // from the topic later on
    let token = subscribeToTopic(topic, mySubscriber)
    socket.send(`Subscriber token: ${token}`)
  })

  wsServer4.on("connection", async (socket) => {
    socket.send(`Defensor de derechos de usuario`)
  })
}

module.exports = { startServer, startWebsocket }
