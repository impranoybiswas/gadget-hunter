import { getUsersCollection } from "@/libs/collection";
import { getSessionUser } from "@/libs/getSessionUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await getSessionUser();
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productIds } = await request.json();

    if (!productIds || !Array.isArray(productIds)) {
      return NextResponse.json(
        { error: "productIds array is required" },
        { status: 400 },
      );
    }

    if (productIds.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No products to sync",
      });
    }

    const users = await getUsersCollection();
    const user = await users.findOne({ email });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Use $addToSet with $each to add multiple items without duplicates
    await users.updateOne(
      { email },
      { $addToSet: { favorites: { $each: productIds } } },
    );

    return NextResponse.json({
      success: true,
      message: `${productIds.length} favorites synced successfully`,
    });
  } catch (error) {
    console.error("Error syncing favorites:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
