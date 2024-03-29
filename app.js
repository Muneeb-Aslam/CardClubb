const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
const userRoutes = require("./routes/userRoutes.js");
const sendEmail = require("./routes/sendEmail.js");
const cors = require("cors");
const categoryRoutes = require("./routes/categoryRoutes.js");
const cardRoutes = require("./routes/cardRoutes.js");
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser')

async function connectToMongoDB() {
    try {
      await mongoose.connect(process.env['MONGO_URI'], { dbName: "CardClubb" });
      console.log("Connected to MongoDB");
    } catch (err) {
      console.log(err);
    }
  }
    
connectToMongoDB();


const app = express();
app.use(cors());
app.use(
    bodyParser.urlencoded({
      limit: "200mb",
      extended: true,
      parameterLimit: 10000000,})
  );
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/card", cardRoutes);
app.use("/category", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api", sendEmail);

if (process.env.NODE_ENV === "production") {
    const path = require("path");
    app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "frontend", "dist", "index.html"),
            function (err) {
                if (err) {
                    res.status(500).send(err);
                }
            }
        );
    });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
