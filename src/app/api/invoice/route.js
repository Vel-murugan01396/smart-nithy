import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Invoice from "@/models/Invoice";

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://smart-nithy.vercel.app",
];

// ✅ Common CORS headers function
function getCorsHeaders(request) {
  const origin = request.headers.get("origin");

  return {
    "Access-Control-Allow-Origin": allowedOrigins.includes(origin)
      ? origin
      : "http://localhost:3000",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

// ✅ Handle Preflight Request
export async function OPTIONS(request) {
  return NextResponse.json({}, { headers: getCorsHeaders(request) });
}

// ✅ POST API
export async function POST(request) {
  try {
    console.log("API HIT 🚀");

    await connectDB();
    console.log("DB CONNECTED ✅");

    const body = await request.json();

    const invoiceCount = await Invoice.countDocuments();

    const newInvoice = await Invoice.create({
      customer: body.customer,
      items: body.items,
      totalAmount: body.totalAmount,
      invoiceNumber: `INV-${invoiceCount + 1}`,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Invoice saved successfully",
        invoice: newInvoice,
      },
      {
        status: 201,
        headers: getCorsHeaders(request), // 🔥 VERY IMPORTANT
      }
    );
  } catch (error) {
    console.error("API ERROR ❌", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
        headers: getCorsHeaders(request), // 🔥 VERY IMPORTANT
      }
    );
  }
}

// ✅ GET LATEST INVOICE
export async function GET(request) {
  try {
    await connectDB();

    const latestInvoice = await Invoice.findOne()
      .sort({ createdAt: -1 })
      .lean();

    if (!latestInvoice) {
      return NextResponse.json(
        { success: false, message: "No invoices found" },
        {
          status: 404,
          headers: getCorsHeaders(request),
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        invoice: latestInvoice,
      },
      {
        status: 200,
        headers: getCorsHeaders(request), // 🔥 VERY IMPORTANT
      }
    );
  } catch (error) {
    console.error("GET API ERROR ❌", error);

    return NextResponse.json(
      { success: false, error: error.message },
      {
        status: 500,
        headers: getCorsHeaders(request), // 🔥 VERY IMPORTANT
      }
    );
  }
}
