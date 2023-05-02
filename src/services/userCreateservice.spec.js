const UserCreateService = require('./UserCreateService');

const UsersRepositoryInMemory = require('../repositories/UsersRepositoriesInMemory');

const AppError = require('../utils/AppError');

describe("UsersCreateService", () => {
  
  let usersRepositoryInMemory = null;
  
  let userCreateService = null;

  beforeEach(() => {

    usersRepositoryInMemory = new UsersRepositoryInMemory();
  
    userCreateService = new UserCreateService(usersRepositoryInMemory);
  });

  it("user should be create", async () => {
  
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    };
  
    const userCreated = await userCreateService.execute(user);
  
    console.log(userCreated);
  
    expect(userCreated).toHaveProperty("id");
  
  });

  it("user should not be created using an existing email", async () => {

    const user1 = {
      name: "User Test 1",
      email: "user@test.com",
      password: "123"
    };

    const user2 = {
      name: "User Test 2",
      email: "user@test.com",
      password: "456"
    };

    await userCreateService.execute(user1);

    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este e-mail já está em uso."));
  });

});