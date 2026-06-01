const router = require("express").Router();

const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/books");
const { validateObjectId } = require("../middlewares/validateObjectId");

router.get("/books", getBooks);
router.get("/books/:book_id", validateObjectId, getBook);
router.post("/books", createBook);
router.patch("/books/:book_id", validateObjectId, updateBook);
router.delete("/books/:book_id", validateObjectId, deleteBook);

module.exports = router;
