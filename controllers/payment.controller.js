
const {createRazorpayInstance} = require("../config/razorpay.config");
const crypto = require("crypto");

const razorpayInstance = createRazorpayInstance();

try {
  const res = fetch ("https://hooks.airtable.com/workflows/v1/genericWebhook/appflufNYF6JcwBoX/wfl5gDIMDRYS6YgJl/wtrivNNozSIdm7NnM", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ID : "id001"}),
  })
} catch (error) {
  console.log(error)
}

exports.createOrder = async (req,res) => {
  const { courseID } = req.body
  console.log(courseID)
  const options = {
    amount : 100,
    currency: "INR",
    receipt: "receipt_order",
  };

  try{
    razorpayInstance.orders.create(options,(err,order)=>{
      if (err) {
        return res.status(500).json({
          success:false,
          message:"something went wrong",
        });
      }
      return res.status(200).json(order); 
    })
  } catch (e) {
    return res.status(500).json({
      success:false,
      message:"something went wrong",
    });
  }
}

exports.verifyPayment = async (req,res) => {
  const { order_id, payment_id, signature } = req.body;
  const hmac = crypto.createHmac("sha256", process.env.RAZERPAY_SECRET);
  hmac.update(order_id + "|" + payment_id );
  const generatedSignature = hmac.digest("hex");
  if (generatedSignature === signature) {
    //db operations
    return res.status(200).json({
      success: true,
      message: "payment verified successfully",
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "payment verification failed",
    });
  }
}