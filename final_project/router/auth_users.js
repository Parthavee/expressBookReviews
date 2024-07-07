const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid

let user = users.filter((item) => item.username === username);
    if( user.length > 0 ) {
        return true;
    } else {
        return false;
    }


}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.

let validuser = users.filter((user) => {
return (user.username === username && user.password === password);
});

if (validuser.length > 0) {
    return true;
} else {
    return false;
}


}

//only registered users can login
regd_users.post("customer/login", (req,res) => {
  //Write your code here

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
      return res.status(404).json({ message: "Error while logging in" });
  }

  if (authenticatedUser(username, password)) {
      let accessToken = jwt.sign({ data: password }, 'access', { expiresIn: 60 * 60 });
      req.session.authorization = { accessToken, username };

      return res.status(200).send("User logged in!");

  } else {
      return res.status(208).json({ message: "Error while login. Check username and/or password!" });
  }

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
