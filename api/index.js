require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { routes } = require('./routes');
const http = require('http');
const socketIO = require('socket.io');
const users = require('./utils/users')()

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

routes.forEach(item => {
  app.use(`/api/v1/${item}`, require(`./routes/${item}`));
});
  
const PORT = process.env.PORT || 3001;

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.VUE_APP_FRONTEND,
    methods: ["GET", "POST"],
    credentials:true
  },
  allowEIO3: true
});

io.on('connection', socket => {
  socket.on('userJoined', (data, cb) => {
    if (!data.login || !data.user || !data.chat) {
      return cb('Данные некорректны')
    }

    socket.join(data.chat)

    users.remove(socket.id)
    users.add({
      id: socket.id,
      login: data.login,
      user: data.user,
      chat: data.chat
    })

    cb({ userSocketId: socket.id });
    io.to(data.chat).emit('updateUsersOnline', users.getByChat(data.chat));
    socket.broadcast
      .to(data.chat)
      .emit('newMessage', {
        chat: data.chat,
        text: `${data.login} зашел в чат...`,
        username: [{ login: 'admin' }]
      })
  })

  socket.on('userLeft', (id, cb) => {
    const user = users.remove(id)
    if (user) {
      socket.leave(user.chat);
      io.to(user.chat).emit('updateUsersOnline', users.getByChat(user.chat));
      io.to(user.chat).emit('newMessage', {
        text: `${user.login} покинул чат...`,
        username: [{ login: 'admin' }]
      });
    }
    cb();
  })

  socket.on('disconnect', () => {
    const user = users.remove(socket.id)
    if (user) {
      socket.leave(user.chat);
      io.to(user.chat).emit('updateUsersOnline', users.getByChat(user.chat));
      io.to(user.chat).emit('newMessage', {
        text: `${user.login} вышел из чата...`,
        username: [{ login: 'admin' }]
      });
    }
  })
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})