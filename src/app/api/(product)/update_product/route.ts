import { connectDb } from "../../route";
import { ItemModel } from "../../model/items";
export const updateProduct = async (request:Request): Promise<any> => {
try {
    connectDb();
    const data = await request.json();
    const {id} = data;
    
   const updateproduct = await ItemModel.findByIdAndUpdate(id,data,{ new: true, runValidators: true });

   if(!updateproduct) {
       return Response.json({
           message: "Product not found",
           success: false,
       });
   }
    return Response.json({
        message: "Product updated successfully",
        success: true,
    })

} catch (error) {
    console.error("Error in updateProduct:", error);
    return Response.json({
        message: `An error occurred while updating the product: ${(error as Error).message}`,
        success: false,
    });
}


}