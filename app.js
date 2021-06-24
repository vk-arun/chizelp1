const express = require("express");
const app = express();
const connectDb = require('./models/conn');
const userRoutes = require('./routes/user');

connectDb();
app.use(express.json({extended: false}));
app.use(express.urlencoded({extended: true}));
app.use('/api/user', userRoutes   );



var PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` app is running on port ${ PORT }`);
});