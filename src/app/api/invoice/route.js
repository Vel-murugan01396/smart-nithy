

import { NextResponse } from "next/server"; // ✅ REQUIRED
import { connectDB } from "@/lib/db";        // ✅ REQUIRED
import Invoice from "@/models/Invoice";      // ✅ REQUIRED

export async function POST(request) {
  try {
    console.log("API HIT 🚀");

    // ✅ DB connection
    await connectDB();
    console.log("DB CONNECTED ✅");

    // ✅ Read request body
    const body = await request.json();
    console.log("BODY 👉", body);

    // ✅ Count invoices
    const invoiceCount = await Invoice.countDocuments();

    // ✅ Create invoice
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
      { status: 201 }
    );
  } catch (error) {
    console.error("API ERROR ❌", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}


// // ✅ GET LATEST INVOICE ONLY
export async function GET() {
  try {
    await connectDB();

    const latestInvoice = await Invoice.findOne()
      .sort({ createdAt: -1 }) // 🔥 latest first
      .lean();

    if (!latestInvoice) {
      return NextResponse.json(
        { success: false, message: "No invoices found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        invoice: latestInvoice,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET API ERROR ❌", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


