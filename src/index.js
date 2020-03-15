const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')
const chalk = require('chalk')
const dotenv = require('dotenv')
const server = require('../schemas')
const path = require('path')

dotenv.config()
const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.CORS_ORIGIN }))

mongoose.set('debug', (coll, method) => {
  if (method !== 'createIndex') console.log(method, coll)
})

mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

mongoose.connection.once('open', () => {
  console.log(chalk.bgGreen('MongoDB connected'))
})

app.use(express.static(path.join(__dirname, '../client/build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

server.applyMiddleware({ app })

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(chalk.bgGreen(`server started: http://localhost:${port}${server.graphqlPath}`))
})
