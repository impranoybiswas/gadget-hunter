import { getUsersCollection } from "@/libs/collection";
import { getSessionUser } from "@/libs/getSessionUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await getSessionUser();
    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: "productId is required" },
        { status: 400 },
      );
    }

    const users = await getUsersCollection();
    const user = await users.findOne({ email });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Standardized to lowercase 'favorites'
    const isFavourite = user.favorites?.includes(productId);
    const update = isFavourite
      ? { $pull: { favorites: productId } }
      : { $addToSet: { favorites: productId } };

    await users.updateOne({ email }, update);

    return NextResponse.json({
      success: true,
      action: isFavourite ? "removed" : "added",
    });
  } catch (error) {
    console.error("Error toggling favourite:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
