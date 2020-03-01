const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')
const chalk = require('chalk')
const dotenv = require('dotenv')
const server = require('../schemas')

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

server.applyMiddleware({ app })

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(chalk.bgGreen(`server started: http://localhost:${port}${server.graphqlPath}`))
})
