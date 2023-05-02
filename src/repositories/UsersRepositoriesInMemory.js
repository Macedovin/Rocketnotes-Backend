class UsersRepositoriesInMemory {

  users = [];

  async create({ email, name, password }) {

    const user = {
      id: Math.round(Math.random() * 1000),
      name,
      email,
      password
    };

    this.users.push(user);

    return user;
  }

  async findByEmail(email) {
    return this.users.find(user => user.email === email);
  }
}

module.exports = UsersRepositoriesInMemory;