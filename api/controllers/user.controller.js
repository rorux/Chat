const { User, Chat } = require('../model');

module.exports = {
  async getInfo(req, res) {
    try {
      const foundUser = await User.findById(res.locals.userId);
      const chats = await Chat.where('_id').in(foundUser.chats);
      return res.status(200).send({ login: foundUser.login, chats });
    } catch (err) {
      return res.status(403).send({
        message: 'Что-то пошло не так..'
      })
    }
  },

  async addChat({ body: { name } }, res) {
    try {
      const foundChat = await Chat.findOne({ name });

      if (foundChat) {
        return res.status(422).send({
          message: 'Такой чат уже существует!'
        })
      }

      const createdChat = await new Chat({ name });
      await createdChat.save();
      const foundNewChat = await Chat.findOne({ name });
      await User.findByIdAndUpdate(res.locals.userId, { $push: { chats: foundNewChat._id } });

      return res.status(200).send({
        message: 'Новый чат успешно добавлен!'
      })
    } catch (err) {
      return res.status(403).send({
        message: 'Что-то пошло не так..'
      })
    }
  },

  async connectChat({ body: { name } }, res) {
    try {
      const foundChat = await Chat.findOne({ name });
      
      if (!foundChat) {
        return res.status(422).send({
          message: 'Чата не существует!'
        })
      }

      const foundUser = await User.findById(res.locals.userId);
      
      if(foundUser.chats.includes(foundChat._id)) {
        return res.status(422).send({
          message: 'Чат добавлен ранее!'
        });
      } else {
        await User.findByIdAndUpdate(res.locals.userId, { $push: { chats: foundChat._id } });
        return res.status(200).send({
          message: 'Вы подключены к чату!'
        });
      }
    } catch (err) {
      return res.status(403).send({
        message: 'Что-то пошло не так..'
      })
    }
  },

  async removeChat({ params: { id } }, res) {
    try {
      const foundUser = await User.findById(res.locals.userId);
      if(foundUser.chats.includes(id)) {
        await User.findByIdAndUpdate(res.locals.userId, { $pull: { chats: id } });
        return res.status(200).send({
          message: 'Чат успешно удален'
        });
      } else {
        return res.status(422).send({
          message: 'Чат отсутствует!'
        });
      }
    } catch (err) {
      return res.status(403).send({
        message: 'Что-то пошло не так..'
      })
    }
  },
}