import { NextRequest, NextResponse } from "next/server";
import { getUsersCollection } from "@/libs/collection";
import { requireRole } from "@/libs/roleCheck";
import { ObjectId } from "mongodb";

export async function GET() {
  const { error, status } = await requireRole(["admin"]);
  if (error) {
    return NextResponse.json({ error }, { status });
  }

  try {
    const usersCollection = await getUsersCollection();
    const users = await usersCollection
      .find({}, { projection: { password: 0 } })
      .toArray();

    return NextResponse.json(users);
  } catch (err) {
    console.error("GET /api/admin/users error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  const { error, status } = await requireRole(["admin"]);
  if (error) {
    return NextResponse.json({ error }, { status });
  }

  try {
    const { userId, role } = await request.json();

    if (!userId || !role) {
      return NextResponse.json(
        { error: "userId and role are required" },
        { status: 400 },
      );
    }

    const usersCollection = await getUsersCollection();
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { role } },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User role updated successfully" });
  } catch (err) {
    console.error("PATCH /api/admin/users error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
