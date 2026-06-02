const router = require("express").Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const { validateObjectId } = require("../middlewares/validateObjectId");

router.get("/users", getUsers);
router.get("/users/:user_id", validateObjectId, getUser);
router.post("/users", createUser);
router.patch("/users/:user_id", validateObjectId, updateUser);
router.delete("/users/:user_id", validateObjectId, deleteUser);

module.exports = router;
