class Users {
  constructor() {
    this.users = [];
  }

  getAll() {
    return this.users;
  }

  get(id) {
    return this.users.find(user => user.id === id);
  }

  add(user) {
    this.users.push(user);
  }

  remove(id) {
    const user = this.get(id);

    if (user) {
      this.users = this.users.filter(user => user.id !== id);
    }

    return user;
  }

  getByChat(chat) {
    return this.users.filter(user => user.chat === chat).map(user => user.user);
  }
}

module.exports = function() {
  return new Users();
}