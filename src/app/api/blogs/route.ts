import { NextRequest, NextResponse } from "next/server";
import { getBlogsCollection } from "../../../libs/collection";

//__________GET All Blogs
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 9;
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const collection = await getBlogsCollection();

    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { content: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const [blogs, total] = await Promise.all([
      collection
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      collection.countDocuments(query),
    ]);

    return NextResponse.json({
      data: blogs,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { message: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

//_________ADD Blog
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, author, content } = body;

    if (!title || !author || !content) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const collection = await getBlogsCollection();

    const blog = {
      title,
      author,
      content,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(blog);

    return NextResponse.json({
      message: "Blog added successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("Add blog error:", error);
    return NextResponse.json(
      { message: "Failed to add blog" },
      { status: 500 }
    );
  }
}
