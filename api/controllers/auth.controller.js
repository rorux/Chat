const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Token } = require('../model');
const { validationResult } = require('express-validator');

const ACCESS_TOKEN_EXPIRE = '10s';
const REFRESH_TOKEN_EXPIRE = '10s';

module.exports = {
  async logout({ body: { refreshToken } }, res) {
    const foundToken = await Token.findOne({ token: refreshToken })

    if (!foundToken) {
      return res.status(403).send({
        message: 'Пользователь не авторизован!'
      })
    }

    await Token.findByIdAndDelete(foundToken._id)

    return res.status(200).send({
      message: 'Пользователь успешно разлогинен!'
    })
  },

  async refreshToken({ body: { refreshToken } }, res) {

    if (!refreshToken) {
      return res.status(403).send({
        message: 'Действие запрещено!'
      })
    }

    const currentToken = await Token.findOne({ token: refreshToken })

    if (!currentToken) {
      return res.status(403).send({
        message: 'Действие запрещено!'
      })
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (err, user) => {
      if (err) {
        return res.status(403).send({
          message: 'Действие запрещено!'
        })
      }

      const accessToken = jwt.sign({
        userId: user._id,
        login: user.login,
      }, process.env.JWT_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRE
      })

      return res.status(200).send({
        accessToken,
        login: user.login
      })

    })
  },

  async login(req, res) {
    try {
      const { login, password } = req.body;
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          message: errors.array()[0].msg
        })
      }

      const foundUser = await User.findOne({ login })

      if (!foundUser) {
        return res.status(403).send({
          message: 'Неверный логин или пароль!'
        })
      }
      
      const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);

      if (!isPasswordCorrect) {
        return res.status(403).send({
          message: 'Неверный логин или пароль!'
        })
      }

      const accessToken = jwt.sign({
        userId: foundUser._id,
        login: foundUser.login,
      }, process.env.JWT_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRE
      })

      const refreshToken = jwt.sign({
        userId: foundUser._id,
        login: foundUser.login,
      }, process.env.JWT_SECRET_REFRESH, {
        expiresIn: REFRESH_TOKEN_EXPIRE
      })

      const foundToken = await Token.findOne({
        user: foundUser._id
      })

      if (foundToken) {
        await Token.findByIdAndUpdate(foundToken._id, { token: refreshToken })
        return res.status(200).send({
          accessToken,
          refreshToken,
          login: foundUser.login,
        })
      }

      const item = new Token({ token: refreshToken, user: foundUser._id });
      await item.save();

      return res.status(200).send({
        accessToken,
        refreshToken,
        login: foundUser.login,
      })

    } catch (err) {
      return res.status(403).send({
        message: 'Неверный логин или пароль!'
      })
    }
  },

  async signUp(req, res) {
    try {
      const { login, password } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          message: errors.array()[0].msg
        })
      }

      const foundUser = await User.findOne({ login });
      
      if (foundUser) {
        return res.status(403).send({
          message: 'Данный логин занят!'
        })
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const createdUser = await new User({ login, password: hashPassword });
      await createdUser.save();

      return res.status(200).send({
        message: "Пользователь создан!"
      })

    } catch (err) {
      return res.status(403).send({
        message: 'Что-то пошло не так..'
      })
    }
  }
}
