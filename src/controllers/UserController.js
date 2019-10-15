const User = require('../models/User')

module.exports = {
  async index(req, res) {
    const users = await User.find({})

    return res.json(users)
  },

  async store(req, res) {
    const { name, email, address, city, state } = req.body;

    const userExists = await User.findOne({ user: name});

    if(userExists) {
      return res.json(userExists);
    }

    const user = await User.create({
      name,
      email,
      address,
      city,
      state
    })

    return res.json(user);
  },

  async delete(req, res) {
    const { userId } = req.params;

    const userExists = await User.findOne({ _id: userId});

    if(!userExists) {
      return res.json({ message: "Usuário nao existe!"});
    }
    
    const request = await User.deleteOne({ _id: userId })

    return res.json(request)

  }
}