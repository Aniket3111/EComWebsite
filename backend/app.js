const express = require("express")

const cookieParser = require("cookie-parser")
const app = express();
const Errormiddleware = require("./middleware/error")
app.use(express.json());
app.use(cookieParser());
//Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute")
app.use("/api/v1",product);
app.use("/api/v1",user)
app.use(Errormiddleware)
module.exports = app