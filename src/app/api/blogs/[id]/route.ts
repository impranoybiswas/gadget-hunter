import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getBlogsCollection } from "@/libs/collection";

//__________GET Single Data
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const collection = await getBlogsCollection();
    const { id } = await context.params;
    const product = await collection.findOne({ _id: new ObjectId(id) });
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return new NextResponse("Error fetching product", { status: 500 });
  }
}

//__________PATCH Data
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const collection = await getBlogsCollection();
    const { id } = await context.params;
    const data = await request.json();
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data },
    );
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return new NextResponse("Error updating product", { status: 500 });
  }
}

//__________DELETE Data
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const collection = await getBlogsCollection();
    const { id } = await context.params;
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return new NextResponse("Error deleting product", { status: 500 });
  }
}
