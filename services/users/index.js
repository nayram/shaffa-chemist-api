const addNewUser = require('./add-new-user')
const getUserById = require('./get-user-by-id')
const getUserByEmailAndPassword = require('./get-user-by-emai-and-password')

module.exports = () => ({
  addNewUser,
  getUserById,
  getUserByEmailAndPassword
})
