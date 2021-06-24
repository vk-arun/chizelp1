const User = require("../models/user");
const { createMdb, listMdb, findOneMdb } = require("../repository/mongoDb");
const jwt = require("jsonwebtoken");

module.exports = {
  create: async (data) => {
    try {
      let result = await createMdb(data, User);
      return result;
    } catch (error) {
      console.log("error ", error);
    }
  },
  list: async (name) => {
    try {
      let query = { name };
      let result = await listMdb(query, User);
      return result;
    } catch (error) {
      console.log("error ", error);
    }
  },

  login: async (data) => {
    try {
      let query = { username: data.username };
      let result = await findOneMdb(query, User);

      if (result) {
        if (data.password == result.password) {
          return {
            message: "login successfully ",
            token: jwt.sign({ username: data.username }, "secret", {
              expiresIn: 10000,
            }),
          };
        } else {
          return { message: "login failed " };
        }
      } else {
        return { message: "invalid credential " };
      }
      console.log("result ", result);
    } catch (error) {
      console.log("error ", error);
    }
  },
};
