const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const topicSchema = new mongoose.Schema({
  id: Number,
  description: String,
  color: String,
})

const newsSchema = new mongoose.Schema({
  id: mongoose.ObjectId,
  topicId: Number,
  title: String,
  description: String,
  authorName: String,
  createdAt: Date,
})

const Topic = mongoose.model("Topic", topicSchema)

const News = mongoose.model("News", newsSchema)

const makeTopic = (topicData) => {
  return new Topic(topicData)
}

const createNews = (newsData) => {
  return new News(newsData)
}

const initializeTopics = () => {
  makeTopic({ id: 1, description: "Internacionales", color: "#EF4E4E" }).save()
  makeTopic({ id: 2, description: "Nacionales", color: "#F7C948" }).save()
  makeTopic({ id: 3, description: "Regionales", color: "#3EBD93" }).save()
  console.log("Topics created succesfully")
  return true
}

const getAllTopics = async () => {
  let AllTopics = await Topic.find({}, (err, topics) => {
    return topics
  })
  return AllTopics
}

const deleteAllTopics = async () => {
  let AllTopics = await Topic.deleteMany({}, (err, topics) => {
    return topics
  })
  return AllTopics
}

const deleteAllNews = async () => {
  let AllNews = await News.deleteMany({}, (err, news) => {
    return news
  })
  return AllNews
}

deleteAllNews()

module.exports = { makeTopic, createNews, getAllTopics }
