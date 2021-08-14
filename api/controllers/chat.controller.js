const { User, Chat } = require('../model');

module.exports = {
  async getMembers({ params: { id } }, res) {
    try {
      const foundChat = await Chat.findOne({ _id: id });
      
      if (!foundChat) {
        return res.status(422).send({
          message: 'Чат не существует!'
        })
      }

      const membersArr = await User.find({ chats: id });
      const members = membersArr.map(user => Object.assign({}, { id: user._id, login: user.login }));
      return res.status(200).send({ members });

    } catch (err) {
      return res.status(403).send({
        message: 'Что-то пошло не так..'
      })
    }
  },
}