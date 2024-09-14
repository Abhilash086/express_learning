import { Router } from "express";
import { products } from "../utils/constants.js";

const router = Router();

router.get("/api/products",(req,res)=>{
    console.log(req.headers.cookie);
    console.log(req.cookies);
    console.log(req.signedCookies.hello);

    if(req.signedCookies.hello && req.signedCookies.hello === "world"){
        return res.send(products);
    }
    return res.send({msg: "Sorry you need correct cookie."});
});

export default router;