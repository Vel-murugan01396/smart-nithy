

// "use client";
// import { useCart } from "@/context/CartContext";
// import { QRCodeCanvas } from "qrcode.react";

// export default function InvoicePreview() {
//   const { cart, total, showInvoice, setShowInvoice } = useCart();

//   if (!showInvoice) return null;

//   const invoiceNo = `INV-${Date.now()}`;
//   const date = new Date().toLocaleDateString();

//   // 🔑 CHANGE THIS TO YOUR REAL UPI ID
//   const upiId = "kingvel136@okicici"; // eg: velmurugan@okicici
//   const payeeName = "My Store";

//   const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
//     payeeName
//   )}&am=${total}&cu=INR`;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//       <div className="bg-white w-full max-w-lg p-6 rounded">

//         {/* Header */}
//         <div className="flex justify-between mb-4">
//           <div>
//             <h2 className="font-bold text-xl">Invoice</h2>
//             <p className="text-sm">Invoice No: {invoiceNo}</p>
//             <p className="text-sm">Date: {date}</p>
//           </div>

//           <button
//             onClick={() => setShowInvoice(false)}
//             className="text-red-500 text-xl"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Items */}
//         <table className="w-full text-sm mb-4">
//           <thead>
//             <tr className="border-b">
//               <th className="text-left py-2">Item</th>
//               <th>Qty</th>
//               <th>Price</th>
//               <th>Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cart.map((item) => (
//               <tr key={item.id} className="border-b">
//                 <td className="py-2">{item.title}</td>
//                 <td className="text-center">{item.qty}</td>
//                 <td className="text-center">₹{item.price}</td>
//                 <td className="text-center">
//                   ₹{item.price * item.qty}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Total */}
//         <div className="flex justify-between font-bold mb-4">
//           <span>Grand Total</span>
//           <span>₹{total}</span>
//         </div>

//         {/* 🔥 QR PAYMENT SECTION */}
//         {/* <div className="border rounded p-4 text-center mb-4">
//           <p className="font-semibold mb-2">Scan to Pay</p>

//           <QRCodeCanvas
//             value={upiUrl}
//             size={180}
//             level="H"
//           />

//           <p className="text-xs text-gray-500 mt-2">
//             Pay using any UPI app (GPay / PhonePe / Paytm)
//           </p>
//         </div> */}
//         <div className="border rounded p-4 mb-4 flex flex-col items-center justify-center text-center">
//   <p className="font-semibold mb-3">Scan to Pay</p>

//   <div className="flex justify-center items-center">
//     <QRCodeCanvas
//       value={upiUrl}
//       size={180}
//       level="H"
//     />
//   </div>

//   <p className="text-xs text-gray-500 mt-3">
//     Pay using any UPI app (GPay / PhonePe / Paytm)
//   </p>
// </div>


//         {/* Actions */}
//         <button
//           onClick={() => window.print()}
//           className="w-full bg-black text-white py-2 rounded"
//         >
//           Print / Download Invoice
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";
import { useCart } from "@/context/CartContext";
import { QRCodeCanvas } from "qrcode.react";

export default function InvoicePreview() {
  const { cart, total, showInvoice, setShowInvoice } = useCart();

  if (!showInvoice) return null;

  const invoiceNo = `INV-${Date.now()}`;
  const date = new Date().toLocaleDateString();

  const upiId = "yourupi@bank"; // CHANGE THIS
  const payeeName = "My Store";

  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    payeeName
  )}&am=${total}&cu=INR`;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      {/* 👇 ONLY THIS WILL PRINT */}
      <div
        id="print-invoice"
        className="bg-white w-[210mm] min-h-[297mm] p-6"
      >
        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">Invoice</h1>
            <p className="text-sm">Invoice No: {invoiceNo}</p>
            <p className="text-sm">Date: {date}</p>
          </div>

          <button
            onClick={() => setShowInvoice(false)}
            className="text-red-500 print:hidden"
          >
            ✕
          </button>
        </div>

        {/* TABLE */}
        <table className="w-full text-sm border-collapse mb-4">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-2">{item.title}</td>
                <td className="text-center">{item.qty}</td>
                <td className="text-center">₹{item.price}</td>
                <td className="text-center">
                  ₹{item.price * item.qty}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTAL */}
        <div className="flex justify-between font-bold mb-6">
          <span>Grand Total</span>
          <span>₹{total}</span>
        </div>

        {/* QR */}
        <div className="border p-4 text-center mb-6">
          <p className="font-semibold mb-2">Scan to Pay</p>

          <div className="flex justify-center">
            <QRCodeCanvas value={upiUrl} size={160} />
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Pay using any UPI app
          </p>
        </div>

        {/* PRINT BUTTON */}
        <button
          onClick={() => window.print()}
          className="w-full bg-black text-white py-2 rounded print:hidden"
        >
          Print / Download Invoice
        </button>
      </div>
    </div>
  );
}

