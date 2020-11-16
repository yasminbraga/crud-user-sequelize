const routes = require('express').Router()

const User = require('./models/index').users

routes.get('/users', async (req, res) => {
  const users = await User.findAll()

  return res.json({ users })
})

routes.get('/users/:id', async (req, res) => {
  const { id } = req.params

  const user = await User.findOne({where: {id}})

  return res.json({user})

})

routes.post('/users', async (req, res) => {
  const user = await User.create(req.body)

  try {

    return res.json(user)
  } catch (error) {
    return res.json(error.message)
  }
})

routes.put('/users/:id', async (req, res) => {
  const userData = req.body
  const {id} = req.params
  try {
    const user = await User.update(userData, { where: {id}})
    
    return res.json('Usuário editado')
  } catch (error) {
    return res.json(error.message)
  }
})

routes.delete('/users/:id', async (req, res) => {
  const {id} = req.params
  try {
    await User.destroy({ where: {id}})

    return res.json('Usuário deletado')
  } catch (error) {
    return res.json(error.message)
  }
})

module.exports = routes;