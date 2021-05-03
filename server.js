const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(require('morgan')('tiny'))
const routesReport = require('rowdy-logger').begin(app)

app.use(express.json())
app.use(require('cors')())

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
  routesReport.print()
})

const userRouter = require('./routes/userRoutes')
const imageRouter = require('./routes/imageRoutes')
app.use('/users', userRouter)
app.use('/images', imageRouter)
