import { Router } from "express";
import { products } from "../utils/constants.js";

const router = Router();

router.get("/api/products",(req,res)=>{
    res.send(products);
});

export default router;