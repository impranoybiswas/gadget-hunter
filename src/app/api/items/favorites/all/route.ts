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

    if (!user?.Favourites?.length) {
      return NextResponse.json({ items: [] });
    }

    const FavouriteIds = user.Favourites.filter((id: string) =>
      ObjectId.isValid(id),
    ).map((id: string) => new ObjectId(id));

    if (!FavouriteIds.length) {
      return NextResponse.json({ items: [] });
    }

    const FavouriteProducts = await products
      .find({ _id: { $in: FavouriteIds } })
      .toArray();

    return NextResponse.json({ items: FavouriteProducts });
  } catch (error) {
    console.error("Error fetching Favourites:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
