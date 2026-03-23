import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");

    const query = status && status !== "All" ? { status } : {};
    
    let ordersQuery = Order.find(query)
      .sort({ createdAt: -1 })
      .lean();

    // Pagination
    if (page && limit) {
      const pageNum = parseInt(page);
      const pageSize = parseInt(limit);
      ordersQuery = ordersQuery.skip((pageNum - 1) * pageSize).limit(pageSize);
    } else if (limit) {
      ordersQuery = ordersQuery.limit(parseInt(limit));
    }

    const orders = await ordersQuery.exec();

    return NextResponse.json(orders, {
      headers: {
        'Cache-Control': 'private, max-age=0, must-revalidate',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { orderIds, status } = body;

    if (!orderIds || !Array.isArray(orderIds) || !status) {
      return NextResponse.json(
        { error: "Missing orderIds or status" },
        { status: 400 },
      );
    }

    await connectDB();

    const updateData: any = { status };
    if (status === "Delivered") {
      updateData.isDelivered = true;
      updateData.deliveredAt = Date.now();
    }

    await Order.updateMany({ _id: { $in: orderIds } }, { $set: updateData });

    return NextResponse.json({ message: "Orders updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
