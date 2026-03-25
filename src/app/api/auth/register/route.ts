import { NextRequest, NextResponse } from "next/server";
import { getUsersCollection } from "../../../../libs/collection";
import bcrypt from "bcryptjs";
import { formattedDate } from "@/utilities/MyFormat";

export async function POST(request: NextRequest) {
  try {
    const { name, email, gender, image, password, phone } =
      await request.json();

    const users = await getUsersCollection();
    const existUser = await users.findOne({ email });
    if (existUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await users.insertOne({
      name,
      email,
      provider: "email",
      password: hashedPassword,
      image,
      gender,
      phone,
      role: "user",
      createdAt: formattedDate(),
      lastSignInAt: formattedDate(),
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
