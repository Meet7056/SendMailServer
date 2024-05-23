const express = require("express");
const moment = require("moment");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const ContactMail = require("./modals/ContactMail");
const cors = require("cors")

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://mansiandhariya:Mansi13102001@mansiandhariacluster0.jvpqk0a.mongodb.net/portfolio', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

app.get('/', (req, res) => {
  res.send('Welcome This is MJ');
});

app.post("/contact", async (req, res) => {
  try {
    const timestamp = Date.now();
    const uniqueId = `${timestamp}`;
    req.body["email_id"] = uniqueId;
    req.body["createdAt"] = moment().format("YYYY-MM-DD HH:mm:ss");
    req.body["updatedAt"] = moment().format("YYYY-MM-DD HH:mm:ss");

    const data = await ContactMail.create(req.body);

    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: 'info@andhariabasu.com',
        pass: 'MansiBasu@1319',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail({
      from: `${req.body.name} <info@andhariabasu.com>`,
      to: 'basu.code@gmail.com',
      subject: "Portfolio - Inquiry",
      html: `
        <p>Hello Basu Andhariya,</p>
        
        <p>You have new contact inquiry</p>
        
        <ul>
          <li><strong>Name :</strong> ${req.body.name}</li>
          <li><strong>Email :</strong> ${req.body.email}</li>
          <li><strong>Message :</strong> ${req.body.message}</li>
        </ul>
        
        <p>Thank you</p>
        
        <p>Best regards,<br>Mansi</p>
      `,
    });

    console.log('Email sent:', info.messageId);

    res.json({
      statusCode: 200,
      data: data,
      message: "Email added successfully and notification sent",
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
