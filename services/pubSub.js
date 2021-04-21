const PubSub = require("pubsub-js")
const { createNews, getAllTopics } = require("../mongodb/models")

const publishNews = (topic, content) => {
  return PubSub.publish(topic, content)
}

const startPublishers = async () => {
const topics = await getAllTopics()
topics.forEach( (topic)=>{
    console.log(topic)
    setInterval(() => {
        let newsData = {
          topicId: topic.id,
          title: "Título de Noticia",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum arcu dolor, nec pellentesque enim eleifend ac. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi congue eros volutpat eros venenatis, vitae bibendum ligula vestibulum. Maecenas non faucibus orci. Mauris a ligula pellentesque, finibus metus nec, accumsan sem. In iaculis massa suscipit lorem porta, a placerat lacus blandit. Sed luctus dapibus congue. Nulla facilisi. Donec at magna risus. Aenean commodo felis ut orci elementum commodo.",
          createdAt: Date.now(),
          authorName: "Juan Pérez",
        }
        let news = createNews(newsData)
        newsData.topic = topic
        news.save()
        newsData._id = news._id
        publishNews(topic.id, JSON.stringify(newsData))
      }, 5000)
})
  
}

const subscribeToTopic = (topic, mySubscriber) => {
  return PubSub.subscribe(topic, mySubscriber)
}

module.exports = { startPublishers, subscribeToTopic }
