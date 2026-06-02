const User = require("../models/user");

const getUsers = (req, res) => {
  return User.find({}).then((users) => {
    res.status(200);
    res.send(users);
  });
};

const getUser = (req, res) => {
  const { user_id } = req.params;
  return User.findById(user_id).then((user) => {
    if (!user) {
      res.status(404);
      res.send("User not found");
      return;
    }
    res.status(200);
    res.send(user);
  });
};

const createUser = (req, res) => {
  const data = req.body;
  return User.create(data).then((user) => {
    res.status(201);
    res.send(user);
  });
};

const updateUser = (req, res) => {
  const { user_id } = req.params;
  const data = req.body;
  return User.findByIdAndUpdate(user_id, data, {
    returnDocument: "after",
    runValidators: true,
  }).then((user) => {
    if (!user) {
      res.status(404);
      res.send("User not found");
      return;
    }
    res.status(200);
    res.send(user);
  });
};

const deleteUser = (req, res) => {
  const { user_id } = req.params;
  return User.findByIdAndDelete(user_id).then((user) => {
    if (!user) {
      res.status(404);
      res.send("User not found");
      return;
    }
    res.status(204);
    res.send();
  });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
