import { Router } from "express";
import { products } from "../utils/constants.js";

const router = Router();

router.get("/api/products",(req,res)=>{
    console.log(req.headers.cookie);
    res.send(products);
});

export default router;