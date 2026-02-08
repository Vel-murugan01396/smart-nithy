

// "use client";
// import { useCart } from "@/context/CartContext";

// export default function Invoice() {
//   const { cart, removeItem, total, setShowInvoice } = useCart();

//   if (cart.length === 0) {
//     return (
//       <div className="bg-white p-4 rounded shadow">
//         <p className="text-gray-500">No items added</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white p-4 rounded shadow">
//       <h2 className="font-bold text-lg mb-3">Invoice Summary</h2>

//       {cart.map((item) => (
//         <div
//           key={item.id}
//           className="flex justify-between items-center mb-2"
//         >
//           <div>
//             <p className="text-sm font-medium">{item.title}</p>
//             <p className="text-xs text-gray-500">
//               ₹{item.price} × {item.qty}
//             </p>
//           </div>

//           <div className="flex gap-2 items-center">
//             <span className="font-semibold">
//               ₹{item.price * item.qty}
//             </span>
//             <button
//               onClick={() => removeItem(item.id)}
//               className="px-2 bg-gray-200 rounded"
//             >
//               −
//             </button>
//           </div>
//         </div>
//       ))}

//       <hr className="my-3" />

//       <div className="flex justify-between font-bold">
//         <span>Total</span>
//         <span>₹{total}</span>
//       </div>

//       <button
//         onClick={() => setShowInvoice(true)}
//         className="w-full mt-4 bg-green-600 text-white py-2 rounded"
//       >
//         Generate Invoice
//       </button>
//     </div>
//   );
// }



// "use client";
// import { useState } from "react";
// import { useCart } from "@/context/CartContext";

// export default function Invoice() {
//   const { cart, removeItem, total, setShowInvoice } = useCart();

//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     mobile: "",
//     address: "",
//   });
//   const [errors, setErrors] = useState({});

//   if (cart.length === 0) {
//     return (
//       <div className="bg-white p-4 rounded shadow">
//         <p className="text-gray-500">No items added</p>
//       </div>
//     );
//   }
// console.log(cart)
// console.log(total)
//   // ✅ Validation
//   const validate = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required";
//     }

//     if (!formData.mobile.trim()) {
//       newErrors.mobile = "Mobile number is required";
//     } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
//       newErrors.mobile = "Enter a valid 10-digit mobile number";
//     }

//     if (!formData.address.trim()) {
//       newErrors.address = "Address is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // ✅ Submit
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     setShowForm(false);
//     setShowInvoice(true);
//   };

//   return (
//     <>
//       {/* Invoice Summary */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="font-bold text-lg mb-3">Invoice Summary</h2>

//         {cart.map((item) => (
//           <div
//             key={item.id}
//             className="flex justify-between items-center mb-2"
//           >
//             <div>
//               <p className="text-sm font-medium">{item.title}</p>
//               <p className="text-xs text-gray-500">
//                 ₹{item.price} × {item.qty}
//               </p>
//             </div>

//             <div className="flex gap-2 items-center">
//               <span className="font-semibold">
//                 ₹{item.price * item.qty}
//               </span>
//               <button
//                 onClick={() => removeItem(item.id)}
//                 className="px-2 bg-gray-200 rounded"
//               >
//                 −
//               </button>
//             </div>
//           </div>
//         ))}

//         <hr className="my-3" />

//         <div className="flex justify-between font-bold">
//           <span>Total</span>
//           <span>₹{total}</span>
//         </div>

//         <button
//           onClick={() => setShowForm(true)}
//           className="w-full mt-4 bg-green-600 text-white py-2 rounded"
//         >
//           Generate Invoice
//         </button>
//       </div>

//       {/* Popup Form */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white p-5 rounded w-[90%] max-w-sm">
//             <h3 className="font-bold text-lg mb-4">
//               Customer Details
//             </h3>

//             <form onSubmit={handleSubmit} className="space-y-3">
//               {/* Name */}
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   className="w-full border p-2 rounded"
//                   value={formData.name}
//                   onChange={(e) => {
//                     setFormData({ ...formData, name: e.target.value });
//                     setErrors({ ...errors, name: "" });
//                   }}
//                 />
//                 {errors.name && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.name}
//                   </p>
//                 )}
//               </div>

//               {/* Mobile */}
//               <div>
//                 <input
//                   type="tel"
//                   placeholder="Mobile Number"
//                   maxLength={10}
//                   className="w-full border p-2 rounded"
//                   value={formData.mobile}
//                   onChange={(e) => {
//                     const value = e.target.value.replace(/\D/g, "");
//                     setFormData({ ...formData, mobile: value });
//                     setErrors({ ...errors, mobile: "" });
//                   }}
//                 />
//                 {errors.mobile && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.mobile}
//                   </p>
//                 )}
//               </div>

//               {/* Address */}
//               <div>
//                 <textarea
//                   placeholder="Address"
//                   className="w-full border p-2 rounded"
//                   value={formData.address}
//                   onChange={(e) => {
//                     setFormData({ ...formData, address: e.target.value });
//                     setErrors({ ...errors, address: "" });
//                   }}
//                 />
//                 {errors.address && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.address}
//                   </p>
//                 )}
//               </div>

//               <div className="flex gap-2 pt-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowForm(false)}
//                   className="w-1/2 bg-gray-300 py-2 rounded"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   className="w-1/2 bg-green-600 text-white py-2 rounded"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }





"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Invoice() {
  const { cart, removeItem, total, setShowInvoice } = useCart();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="bg-white p-4 rounded shadow">
        <p className="text-gray-500">No items added</p>
      </div>
    );
  }

  // ✅ Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit + POST
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = {
      customer: formData,
      items: cart,
      totalAmount: total,
      createdAt: new Date(),
    };

    try {
      setLoading(true);

      const res = await fetch("/api/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed");
      }

      // console.log("Invoice Saved:", data);

      setShowForm(false);
      setShowInvoice(true);
    } catch (error) {
      console.error(error);
      alert("Failed to create invoice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Invoice Summary */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-lg mb-3">Invoice Summary</h2>

        {cart.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
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
          onClick={() => setShowForm(true)}
          className="w-full mt-4 bg-green-600 text-white py-2 rounded"
        >
          Generate Invoice
        </button>
      </div>

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded w-[90%] max-w-sm">
            <h3 className="font-bold text-lg mb-4">Customer Details</h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name */}
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border p-2 rounded"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    setErrors({ ...errors, name: "" });
                  }}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  maxLength={10}
                  className="w-full border p-2 rounded"
                  value={formData.mobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setFormData({ ...formData, mobile: value });
                    setErrors({ ...errors, mobile: "" });
                  }}
                />
                {errors.mobile && (
                  <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <textarea
                  placeholder="Address"
                  className="w-full border p-2 rounded"
                  value={formData.address}
                  onChange={(e) => {
                    setFormData({ ...formData, address: e.target.value });
                    setErrors({ ...errors, address: "" });
                  }}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.address}
                  </p>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="w-1/2 bg-gray-300 py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-1/2 bg-green-600 text-white py-2 rounded"
                >
                  {loading ? "Saving..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
