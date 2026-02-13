"use client";
import React,{useEffect,useState} from "react";
import { useCart } from "@/context/CartContext";
import { QRCodeCanvas } from "qrcode.react";



export default function InvoicePreview() {
  const { cart, total,gst,subtotal, showInvoice, setShowInvoice } = useCart();
   const [invoice, setInvoice] = useState(null);

 useEffect(() => {
    if (!showInvoice) return; // 👈 guard INSIDE effect

    const fetchingData = async () => {
      try {
        const res = await fetch("/api/invoice?latest=true");
        const data = await res.json();
        setInvoice(data); 
        console.log("INVOICE DATA 👉", data);
      } catch (error) {
        console.log("FETCH ERROR ❌", error);
      }
    };

    fetchingData();
  }, [showInvoice]);

  // ✅ conditional render AFTER hooks
  if (!showInvoice) return null;



  const date = new Date().toLocaleDateString();



  // 🔹 UPI DETAILS
  const upiId = "kingvel136@okicici";
  const payeeName = "My Store";

  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    payeeName
  )}&am=${total.toFixed(2)}&cu=INR`;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">

      {/* MODAL */}
      <div className="bg-white w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-xl sm:rounded-xl p-4 sm:p-6">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="font-bold text-lg sm:text-xl">
              Tax Invoice
            </h2>
            <p className="text-xs sm:text-sm">

              Invoice No: {invoice?.invoice?.invoiceNumber}

   

            </p>
            <p className="text-xs sm:text-sm">Date: {date}</p>
          </div>

          <button
            onClick={() => setShowInvoice(false)}
            className="text-red-500 text-2xl sm:text-xl print:hidden"
          >
            ✕
          </button>
        </div>

        {/* CUSTOMER DETAILS */}
        <div className="border rounded p-3 mb-4 text-xs sm:text-sm">
          <p>

            <strong>Customer:</strong>
             {invoice?.invoice?.customer?.name}
          </p>
          <p>
            <strong>GST No:</strong> 
            {invoice?.invoice?._id}

          </p>
        </div>

        {/* ITEMS */}
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full text-xs sm:text-sm border">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="text-left px-2 py-2">Item</th>
                <th className="text-center">Qty</th>
                <th className="text-center">Price</th>
                <th className="text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-2 py-2">{item.title}</td>
                  <td className="text-center">{item.qty}</td>
                  <td className="text-center">₹{item.price}</td>
                  <td className="text-center">
                    ₹{item.price * item.qty}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TOTALS */}
        <div className="text-sm sm:text-base space-y-2 mb-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>GST (18%)</span>
            <span>₹{gst.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold border-t pt-2">
            <span>Grand Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
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
