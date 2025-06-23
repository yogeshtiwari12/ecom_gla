import { connectDb } from "../../route";
import { ItemModel } from "../../model/items";
import { useSession } from "next-auth/react";

const { data: session } = useSession();
console.log("Session Data:", session);


export const UserView = async (request: Request): Promise<any> => {
  try {
    await connectDb();

    const userdata = await ItemModel.find().populate("User");
    if(!userdata || userdata.length === 0) {
      return Response.json({
        message: "No products found",
        success: false,
      });
    }

    return Response.json({
      message: "Products retrieved successfully",
      success: true,
      data: userdata,
    });

}
catch (error) {
    return Response.json({
      message: `An error occurred while connecting to the database: ${(error as Error).message}`,
      success: false,
    });
  }
}