
import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    customer: Object,
    items: Array,
    totalAmount: Number,
    subTotalAmount: Number,
    gstAmount: Number,
    invoiceNumber: String,
    gstNumber: String, // 👈 required
  },
  { timestamps: true }
);

export default mongoose.models.Invoice ||
  mongoose.model("Invoice", InvoiceSchema);
