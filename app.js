const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const router = require("./routes/payment.routes");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();

const {RAZERPAY_KEY, RAZERPAY_SECRET} = process.env;

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("Hello, World! This is a basic Node.js server.");
// });

app.get("/payment", (req, res) => {
  console.log(req)
  res.json({ message: "Hello" });
});

app.post("/webhook", (req, res) => {
  console.log("Webhook received!");
  console.log("Data received:", req.body);

  res.status(200).json({ message: "Webhook received successfully!" });
});

app.use('/api',router);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
