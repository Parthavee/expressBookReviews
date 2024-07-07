const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here

  let username = req.body.username;
  let password = req.body.password;

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

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  
  res.send(JSON.stringify(books, null, 4));

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here

  let isbn = req.params.isbn;
  let book = books[isbn];

  res.send(JSON.stringify(book, null, 4));

  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here

  let author = req.params.author;

  let booksKey = Object.values(books);
  let book = booksKey.filter((item) => item.author === author);

  res.send(JSON.stringify(book, null, 4));
  

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
 
  let title = req.params.title;

  let booksKey = Object.values(books);
  let book = booksKey.filter((item) => item.title === title);

  res.send(JSON.stringify(book, null, 4));

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here

  let isbn = req.params.isbn;

  let review = books[isbn].reviews;

  res.send(JSON.stringify(review, null, 4));

});

module.exports.general = public_users;
