const users = [];

function createUser(name, email) {
  const id = Date.now().toString(); // Simple unique ID
  const user = { id, name, email };
  users.push(user);
  return user;
}

function getAllUsers() {
  return users;
}

function getUserById(id) {
  return users.find(user => user.id === id);
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById
};
