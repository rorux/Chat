const { User, Chat, Message } = require('../model');
const { validationResult } = require('express-validator');
const htmlspecialchars = require('htmlspecialchars');
const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
  async getMessages({ params: { id } }, res) {
    try {
      const foundChat = await Chat.findOne({ _id: id });
      
      if (!foundChat) {
        return res.status(403).send({
          message: 'Ошибка!'
        })
      }

      const messages = await Message.aggregate([
        { $match: { chat: { $eq: ObjectId(id) } } },
        { $lookup:
          {
            from: "users",
            let: { message_user: "$user" },
            pipeline: [
              { $match:
                 { $expr:
                    { $eq: [ "$_id",  "$$message_user" ] }
                 }
              },
              { $project: { __v: 0, _id: 0, password: 0, chats: 0 } }
           ],
           as: "username"
          }
        },
        { "$sort": { "date": 1 } }, 
      ]);

      return res.status(200).send({ messages });

    } catch (err) {
      return res.status(403).send({
        message: 'Что-то пошло не так..'
      })
    }
  },

  async addMessage(req, res) {
    try {
      const { user, chat, text } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          message: errors.array()[0].msg
        })
      }

      const foundChat = await Chat.findOne({ _id: chat });
      
      if (!foundChat) {
        return res.status(403).send({
          message: 'Ошибка!'
        })
      }

      const foundUser = await User.findOne({ _id: user });
      
      if (!foundUser) {
        return res.status(403).send({
          message: 'Ошибка!'
        })
      }

      let countMessages = 0;
      await Message.countDocuments({ chat }, function(err, count) {
        countMessages = count;
      });

      if(countMessages < 100) {
        const textRes = htmlspecialchars(text);

        const newMessage = await new Message({ user, chat, text: textRes });
        await newMessage.save();

        const newMessageReq = Object.assign(JSON.parse(JSON.stringify(newMessage)), { username: [{ login: foundUser.login }] });
        return res.status(200).send({
          message: newMessageReq,
        })
      } else {
        const newMessageReq = {
          text: 'Не более 100 сообщений...',
          _id: '1',
          date: Date.now().toString(),
          chat: chat,
          user: user,
          username: [{ login: 'admin' }]
        };
        return res.status(200).send({
          message: newMessageReq,
        })
      }

    } catch (err) {
      return res.status(403).send({
        message: 'Что-то пошло не так..'
      })
    }
  },
}