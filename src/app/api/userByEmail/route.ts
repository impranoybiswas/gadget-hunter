import { getUsersCollection } from "@/libs/collection";
import { NextRequest, NextResponse } from "next/server";

//Get User by Email
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const users = await getUsersCollection();
    // Publicly accessible but limited to non-sensitive fields
    const user = await users.findOne(
      { email },
      { projection: { name: 1, image: 1, role: 1 } },
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
