const { create, list, dropdown, login } = require("../service/user");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { updateMdb } = require("../repository/mongoDb");
// var nodemailer = require('nodemailer');

module.exports = {
  create: async (req, res) => {
    try {
      const result = await create(req.body);
      if (
        !["username", "password", "address", "email"].every((key) =>
          Object.keys(req.body).includes(key)
        )
      ) {
        res.json({ message: "username or password missing" });
      } else if (req.body.password.length < 5) {
        res.json({ message: " Passwords should be a minimum 6 digit ." });
      } else if (!validateEmail(req.body.email)) {
        res.json({ message: " Please enter valid email ." });
      } else {
        res.json(result);
      }
    } catch (error) {
      console.log("error ", error);
      throw error;
    }
  },
  list: async (req, res) => {
    try {
      const name = req.query.name;
      const result = await list(name);
      res.json(result);
    } catch (error) {
      console.log("error ", error);
      throw error;
    }
  },
  update: async (req, res) => {
    try {
      const result = await updateMdb(req.body.id, req.body, User);
      res.json(result);
    } catch (error) {
      console.log("error ", error);
      throw error;
    }
  },
  login: async (req, res) => {
    try {
      let query = req.query;
      if (
        !["username", "password"].every((key) =>
          Object.keys(req.query).includes(key)
        )
      ) {
        res.json({ message: "username or password missing" });
      } else {
        console.log("req.query ", query);
        const result = await login(query);
        res.json(result);
      }
    } catch (error) {
      console.log("error ", error);
      throw error;
    }
  },
  verifyJwtToken: async (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json("Unauthorize user");

    try {
      const decoded = jwt.verify(token, "secret");
      req.user = decoded;
      if (decoded) {
        return next();
      } else {
        res.status(401);
        res.send({ status: false, message: "Unauthorized Access" });
      }
    } catch (e) {
      res.status(400).json("Token not valid");
    }
  },
};
function validateEmail(email) {
  console.log("email ", email);
  var re = /\S+@\S+\.\S+/;
  console.log(re.test(email));
  return re.test(email);
}

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'youremail@gmail.com',
//     pass: 'yourpassword'
//   }
// });

// var mailOptions = {
//   from: 'youremail@gmail.com',
//   to: 'myfriend@yahoo.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
