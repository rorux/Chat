const { User, Chat } = require('../model');
const { validationResult } = require('express-validator');

module.exports = {
  async getInfo(req, res) {
    try {
      const foundUser = await User.findById(res.locals.userId);
      const chats = await Chat.where('_id').in(foundUser.chats);
      return res.status(200).send({ userId: foundUser._id, login: foundUser.login, chats });
    } catch (err) {
      return res.status(403).send({
        message: 'Что-то пошло не так..'
      })
    }
  },

  async getChatsOwner(req, res) {
    try {
      const chats = await Chat.find({ owner: res.locals.userId });
      return res.status(200).send({ chats });
    } catch (err) {
      return res.status(403).send({
        message: 'Что-то пошло не так..'
      })
    }
  },

  async addChat(req, res) {
    try {
      const { name, owner } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          message: errors.array()[0].msg
        })
      }

      const foundChat = await Chat.findOne({ name });

      if (foundChat) {
        return res.status(422).send({
          message: 'Чат уже существует!'
        })
      }

      const createdChat = await new Chat({ name, owner });
      await createdChat.save();
      const foundNewChat = await Chat.findOne({ name, owner });
      await User.findByIdAndUpdate(res.locals.userId, { $push: { chats: foundNewChat._id } });

      return res.status(200).send({
        message: 'Чат успешно добавлен!',
        chat: foundNewChat
      })
    } catch (err) {
      return res.status(403).send({
        message: 'Что-то пошло не так..'
      })
    }
  },

  async connectChat(req, res) {
    try {
      const { name } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          message: errors.array()[0].msg
        })
      }
      
      const foundChat = await Chat.findOne({ name: new RegExp('^' + name + '$', 'i') });
      
      if (!foundChat) {
        return res.status(422).send({
          message: 'Чат не существует!'
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
          message: 'Вы подключены к чату!',
          chat: foundChat
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