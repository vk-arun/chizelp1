const mogoose = require("mongoose");

const URI =
  "mongodb+srv://user:dbUser1236@cluster0.ynall.mongodb.net/chizel?retryWrites=true&w=majority";

const connectDb = async () => {
  await mogoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  console.log("db connected");
};
module.exports = connectDb;