const usersRouter = require('./userRouter')


const routes = (app) => {
  app.use('/users', usersRouter)
}

module.exports = routes