const mongoose = require('mongoose');

mongoose
  .connect("mongodb+srv://mansiandhariya:Mansi13102001@mansiandhariacluster0.jvpqk0a.mongodb.net/portfolio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection successful");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

module.exports = mongoose.connection;