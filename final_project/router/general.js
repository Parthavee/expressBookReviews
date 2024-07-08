const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here

  const username = req.body.username;
  const password = req.body.password;

  if(username && password) {
    if(!isValid(username)) {
        users.push({username, password});
        res.json({ message: "User registered!"});
    } else {
        res.status(400).json({ message: "User already exists!" });
    }
  } else {
    res.status(400).json({ message: "Username and/or password are not provided!"});
  }

});

const getBooks = () => {
    return books;
}

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  //Write your code here

  try{
    const bookList = await getBooks();
    res.status(200).send(JSON.stringify(books, null, 4));

  } catch(err) {
    res.status(400).json({ message: err });
  }
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  //Write your code here

  const isbn = req.params.isbn;
  try {
    const book = await books[isbn];
    console.log("Reached isbn" , isbn);
    res.send(JSON.stringify("book", null, 4));

  } catch(err) {
    res.status(400).json({ message: err });
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here

  const author = req.params.author;

  const booksKey = Object.values(books);
  const book = booksKey.filter((item) => item.author === author);

  res.send(JSON.stringify(book, null, 4));
  

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
 
  const title = req.params.title;

  const booksKey = Object.values(books);
  const book = booksKey.filter((item) => item.title === title);

  res.send(JSON.stringify(book, null, 4));

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here

  const isbn = req.params.isbn;

  const review = books[isbn].reviews;

  res.send(JSON.stringify(review, null, 4));

});

module.exports.general = public_users;
