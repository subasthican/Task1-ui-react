import express from "express";
import Product from '../models/product.js'

const router = express.Router();

//create
router.post("/",async(req,res)=>
{
    const product = new Product(req.body);
    const saved = await product.save();
    res.json(saved);

});

//read
router.get("/:id",async(req,res)=>{
    const product = await Product.find();
    res.json(product);
});

//update
router.put("/:id",async (req,res)=>{
    const updated = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.json(updated);
});

//delete
router.delete("/:id",async(req,res)=>{
    await Product.findByIdDelete(req.params.id);
    res.json({message:"deleted success"});
});

export default router;


