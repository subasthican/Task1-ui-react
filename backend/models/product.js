import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    lowStockThreshold:Number,
    category:String,
    warranty:String
})
export default mongoose.model("Product",ProductSchema);

