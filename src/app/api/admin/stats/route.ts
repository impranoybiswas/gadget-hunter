import { NextResponse } from "next/server";
import {
  getItemsCollection,
  getUsersCollection,
  getPaymentsCollection,
} from "@/libs/collection";
import { requireRole } from "@/libs/roleCheck";

export async function GET() {
  const { error, status } = await requireRole(["admin"]);
  if (error) {
    return NextResponse.json({ error }, { status });
  }

  try {
    const products = await getItemsCollection();
    const users = await getUsersCollection();
    const payments = await getPaymentsCollection();

    const totalProducts = await products.countDocuments();
    const totalUsers = await users.countDocuments();

    // Calculate total stock (sum of all product quantities)
    const productData = await products.find({}).toArray();
    const totalStock = productData.reduce(
      (acc, p) => acc + (p.quantity || 0),
      0,
    );

    // Get unique categories (distinct not supported in APIStrict: true)
    const categoryAgg = await products
      .aggregate([{ $group: { _id: "$category" } }])
      .toArray();
    const totalCategories = categoryAgg.length;

    // Calculate total revenue
    const paymentData = await payments.find({ status: "success" }).toArray();
    const totalRevenue = paymentData.reduce(
      (acc, pay) => acc + (pay.amount || 0),
      0,
    );

    return NextResponse.json({
      totalProducts,
      totalUsers,
      totalStock,
      totalCategories,
      totalRevenue,
    });
  } catch (err) {
    console.error("GET /api/admin/stats error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
