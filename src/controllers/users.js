const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200);
      res.send(users);
    })
    .catch((err) => {
      res.status(500);
      res.send("Error fetching users");
    });
};

const getUser = (req, res) => {
  const { user_id } = req.params;
  User.findById(user_id)
    .then((user) => {
      if (!user) {
        res.status(404);
        res.send("User not found");
        return;
      }
      res.status(200);
      res.send(user);
    })
    .catch((err) => {
      res.status(500);
      res.send("Error fetching user");
    });
};

const createUser = (req, res) => {
  const data = req.body;
  User.create(data)
    .then((user) => {
      res.status(201);
      res.send(user);
    })
    .catch((err) => {
      res.status(500);
      res.send(`Error creating user: ${err.message}`);
    });
};

const updateUser = (req, res) => {
  const { user_id } = req.params;
  const data = req.body;
  User.findByIdAndUpdate(user_id, data, { returnDocument: 'after', runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404);
        res.send("User not found");
        return;
      }
      res.status(200);
      res.send(user);
    })
    .catch((err) => {
      res.status(500);
      res.send(`Error updating user: ${err.message}`);
    });
};

const deleteUser = (req, res) => {
  const { user_id } = req.params;
  User.findByIdAndDelete(user_id)
    .then((user) => {
      if (!user) {
        res.status(404);
        res.send("User not found");
        return;
      }
      res.status(200);
      res.send("User deleted");
    })
    .catch((err) => {
      res.status(500);
      res.send(`Error deleting user: ${err.message}`);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
