

"use client";
import { useCart } from "@/context/CartContext";
import { QRCodeCanvas } from "qrcode.react";



/* -------------------------------
   RANDOM CUSTOMER NAME GENERATOR
-------------------------------- */
const getRandomCustomerName = () => {
  const firstNames = [
    "Arun",
    "Karthik",
    "Ravi",
    "Suresh",
    "Vijay",
    "Ajith",
    "Prakash",
    "Manoj",
    "Rahul",
    "Deepak",
  ];

  const lastNames = [
    "Kumar",
    "Sharma",
    "Singh",
    "Iyer",
    "Reddy",
    "Patel",
    "Gupta",
    "Mehta",
    "Nair",
    "Das",
  ];

  const first =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const last =
    lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${first} ${last}`;
};

/* -------------------------------
   COMPONENT
-------------------------------- */
export default function InvoicePreview() {
  const { cart, total, showInvoice, setShowInvoice } = useCart();

  if (!showInvoice) return null;

  const invoiceNo = `INV-${Date.now()}`;
  const date = new Date().toLocaleDateString();

  // 🔹 GST CALCULATION
  const GST_PERCENT = 18;
  const gstAmount = (total * GST_PERCENT) / 100;
  const grandTotal = total + gstAmount;

  // 🔹 UPI DETAILS
  const upiId = "kingvel136@okicici";
  const payeeName = "My Store";

  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    payeeName
  )}&am=${grandTotal.toFixed(2)}&cu=INR`;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">

      {/* MODAL */}
      <div className="bg-white w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-xl sm:rounded-xl p-4 sm:p-6">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="font-bold text-xl">Invoice</h2>
            <p className="text-sm">Invoice No: {invoiceNo}</p>
            <p className="text-sm">Date: {date}</p>
          </div>

          <button
            onClick={() => setShowInvoice(false)}
            className="text-red-500 text-2xl sm:text-xl print:hidden"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <table className="w-full text-sm mb-4">
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

        {/* Total */}
        <div className="flex justify-between font-bold mb-4">
          <span>Grand Total</span>
          <span>₹{total}</span>
        </div>

        {/* QR PAYMENT */}
        <div className="border rounded p-4 mb-4 flex flex-col items-center text-center">
          <p className="font-semibold mb-3 text-sm sm:text-base">
            Scan to Pay
          </p>

          <QRCodeCanvas value={upiUrl} size={180} />

          <p className="text-xs text-gray-500 mt-3">
            Pay using any UPI app
          </p>
        </div>

        {/* ACTION */}
        <button
          onClick={() => window.print()}
          className="w-full bg-black text-white py-3 rounded text-sm sm:text-base print:hidden"
        >
          Print / Download Invoice
        </button>
      </div>
    </div>
  );
}








