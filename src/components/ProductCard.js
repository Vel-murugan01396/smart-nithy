"use client";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white p-4 rounded shadow">
      <img src={product.image} className="h-40 w-full rounded object-cover" />

      <h3 className="font-semibold mt-2">{product.title}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="text-sm text-yellow-500">⭐ {product.rating}</p>

      <div className="flex justify-between items-center mt-3">
        <span className="font-bold">₹{product.price}</span>
        <button
          onClick={() => addToCart(product)}
          className="bg-black text-white px-3 py-1 rounded text-sm"
        >
          Buy
        </button>
      </div>
    </div>
  );
}



