import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },

  amount: { type: Number, required: true },           // full price
  sellerAmount: { type: Number, required: true },     // after commission
  platformFee: { type: Number, required: true },      // commission amount

  status: { type: String, enum: ["pending", "success", "failed"], default: "success" },
  transactionId: String,      // from payment gateway
}, { timestamps: true });


export default mongoose.model("Transaction", transactionSchema);
