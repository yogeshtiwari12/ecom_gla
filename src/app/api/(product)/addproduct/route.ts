
import { connectDb } from "../../route";
import { ItemModel } from "../../model/items";
import { NextResponse as Response } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDb();

    const { name, description, price, category, imageUrl, stock, reason } =
      await request.json();

    if(!name || !description || !price || !category || !imageUrl || stock === undefined) {
      return Response.json(
        {
          success: false,
          message: "All fields are required",
        },
      );
    }

    const Items = new ItemModel({
      name,
      description,
      price,
      category,
      imageUrl,
      stock,
      reason,
    });
    await Items.save();

    return Response.json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to add product",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
