import { NextRequest, NextResponse } from "next/server";
import { getBlogsCollection } from "@/libs/collection";
import { getSessionUser } from "@/libs/getSessionUser";
import { ObjectId } from "mongodb";
import { Blog } from "@/types/blog";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const sessionResult = await getSessionUser();

    if (sessionResult.error) {
      return sessionResult.error;
    }

    const { email } = sessionResult;

    const collection = await getBlogsCollection();
    const blog = (await collection.findOne({
      _id: new ObjectId(id),
    })) as Blog | null;

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    const likers = blog.likers || [];
    const isLiked = likers.includes(email);

    const update = isLiked
      ? { $pull: { likers: email } }
      : { $addToSet: { likers: email } };

    // @ts-expect-error: updateOne filter and update object typing issues with local Blog type
    await collection.updateOne({ _id: new ObjectId(id) }, update);

    return NextResponse.json({
      message: isLiked ? "Uniked" : "Liked",
      isLiked: !isLiked,
    });
  } catch (error) {
    console.error("Like blog error:", error);
    return NextResponse.json(
      { message: "Failed to like blog" },
      { status: 500 },
    );
  }
}
