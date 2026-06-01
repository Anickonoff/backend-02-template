const Book = require("../models/book");

const getBooks = (req, res) => {
  return Book.find({})
    .then((books) => {
      res.status(200);
      res.send(books);
    })
    .catch((err) => {
      res.status(500);
      res.send("Error fetching books");
    });
};

const getBook = (req, res) => {
  const { book_id } = req.params;
  return Book.findById(book_id)
    .then((book) => {
      if (!book) {
        res.status(404);
        res.send("Book not found");
        return;
      }
      res.status(200);
      res.send(book);
    })
    .catch((err) => {
      res.status(500);
      res.send(err.message);
    });
};

const createBook = (req, res) => {
  const data = req.body;
  return Book.create(data).then((book) => {
    res.status(201);
    res.send(book);
  });
};

const updateBook = (req, res) => {
  const { book_id } = req.params;
  const data = req.body;
  return Book.findByIdAndUpdate(book_id, data, {
    returnDocument: "after",
    runValidators: true,
  }).then((book) => {
    if (!book) {
      res.status(404);
      res.send("Book not found");
      return;
    }
    res.status(200);
    res.send(book);
  });
};

const deleteBook = (req, res) => {
  const { book_id } = req.params;
  return Book.findByIdAndDelete(book_id).then((book) => {
    if (!book) {
      res.status(404);
      res.send("Book not found");
      return;
    }
    res.status(204);
    res.send();
  });
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
