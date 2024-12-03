const razorpay = require("razorpay");
const dotenv = require("dotenv");
dotenv.config();

exports.createRazorpayInstance = () => {
  return new razorpay({
    key_id:process.env.RAZERPAY_KEY,
    key_secret:process.env.RAZERPAY_SECRET
  })
}