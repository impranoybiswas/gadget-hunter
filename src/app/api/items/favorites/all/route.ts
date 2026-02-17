import { getUsersCollection, getItemsCollection } from "@/libs/collection";
import { getSessionUser } from "@/libs/getSessionUser";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const sessionUser = await getSessionUser();

    if (!sessionUser?.email) {
      return NextResponse.json({ items: [] });
    }
    const { email } = sessionUser;

    const users = await getUsersCollection();
    const products = await getItemsCollection();

    const user = await users.findOne({ email });

    // Standardized to lowercase 'favorites'
    if (!user?.favorites?.length) {
      return NextResponse.json({ items: [] });
    }

    const favouriteIds = user.favorites
      .filter((id: string) => ObjectId.isValid(id))
      .map((id: string) => new ObjectId(id));

    if (!favouriteIds.length) {
      return NextResponse.json({ items: [] });
    }

    const favouriteProducts = await products
      .find({ _id: { $in: favouriteIds } })
      .toArray();

    return NextResponse.json({ items: favouriteProducts });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
