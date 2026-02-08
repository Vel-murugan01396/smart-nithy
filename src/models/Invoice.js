// import mongoose from "mongoose";

// const InvoiceSchema = new mongoose.Schema(
//   {
//     // Customer details
//     customer: {
//       name: {
//         type: String,
//         required: true,
//       },
//       mobile: {
//         type: String,
//         required: true,
//       },
//       address: {
//         type: String,
//         required: true,
//       },
//     },

//     // Purchased items
//     items: [
//       {
//         id: Number,
//         title: String,
//         price: Number,
//         qty: Number,
//         image: String,
//       },
//     ],

//     // Invoice total
//     totalAmount: {
//       type: Number,
//       required: true,
//     },

//     // Invoice number
//     invoiceNumber: {
//       type: String,
//       unique: true,
//     },
//   },
//   {
//     timestamps: true, // adds createdAt & updatedAt automatically
//   }
// );

// export default mongoose.models.Invoice ||
//   mongoose.model("Invoice", InvoiceSchema);



// import mongoose from "mongoose";

// const InvoiceSchema = new mongoose.Schema(
//   {
//     customer: Object,
//     items: Array,
//     totalAmount: Number,
//     invoiceNumber: String,
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Invoice ||
//   mongoose.model("Invoice", InvoiceSchema);


import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    customer: Object,
    items: Array,
    totalAmount: Number,
    invoiceNumber: String,
    gstNumber: String, // 👈 required
  },
  { timestamps: true }
);

export default mongoose.models.Invoice ||
  mongoose.model("Invoice", InvoiceSchema);
