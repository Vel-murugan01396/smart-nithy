

"use client";
import { useCart } from "@/context/CartContext";

export default function Invoice() {
  const { cart, removeItem, total, setShowInvoice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-white p-4 rounded shadow">
        <p className="text-gray-500">No items added</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-lg mb-3">Invoice Summary</h2>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center mb-2"
        >
          <div>
            <p className="text-sm font-medium">{item.title}</p>
            <p className="text-xs text-gray-500">
              ₹{item.price} × {item.qty}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <span className="font-semibold">
              ₹{item.price * item.qty}
            </span>
            <button
              onClick={() => removeItem(item.id)}
              className="px-2 bg-gray-200 rounded"
            >
              −
            </button>
          </div>
        </div>
      ))}

      <hr className="my-3" />

      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      <button
        onClick={() => setShowInvoice(true)}
        className="w-full mt-4 bg-green-600 text-white py-2 rounded"
      >
        Generate Invoice
      </button>
    </div>
  );
}
