const { User, Chat, Message } = require('../model');
//const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
  async getChat({ params: { id } }, res) {
    try {
      const foundChat = await Chat.findOne({ _id: id });
      
      if (!foundChat) {
        return res.status(422).send({
          message: 'Чат не существует!'
        })
      }

      return res.status(200).send({ chat: foundChat });

    } catch (err) {
      return res.status(403).send({
        message: 'Что-то пошло не так..'
      })
    }
  },
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

  async deleteChat({ params: { id } }, res) {
    try {
      const foundChat = await Chat.findOne({ _id: id });
      
      if (!foundChat) {
        return res.status(422).send({
          message: 'Чат не существует!'
        })
      }

      await Chat.deleteOne({ _id: id });
      await Message.deleteMany({ chat: id });
      return res.status(200).send({ message: 'Чат удален!' });

    } catch (err) {
      return res.status(403).send({
        message: 'Что-то пошло не так..'
      })
    }
  },
}