const user = require('./user');
const auth = require('./auth');

module.exports = (app) => {
  app.use('/users', user),
  app.use('/auth', auth)
}