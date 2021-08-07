const { body } = require('express-validator');

exports.authValidator = [
  body('login')
  .isLength({
    min: 3,
    max: 10
  })
  .withMessage('Логин от 3 до 10 символов!')
  .trim(),

  body('password')
  .isLength({
    min: 2,
    max: 10
  })
  .withMessage('Пароль от 2 до 10 символов!')
  .trim(),
];

exports.chatValidator = [
  body('name')
  .isLength({
    min: 3,
    max: 20
  })
  .withMessage('Название от 3 до 20 символов!')
  .trim(),
];