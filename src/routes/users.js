import { Router } from "express";
import { query, checkSchema, validationResult} from "express-validator"
import { createQuerySchema } from "../utils/validationSchemas.js";

const router = Router();

router.get("/api/users", checkSchema(createQuerySchema), (req,res)=>{
    const {query:{filter, value}} = req;
    const result = validationResult(req);
    console.log(result);

    if(!result.isEmpty())
        return res.status(400).send({errors: result.array()});
    
    if( filter && value) 
        return res.send(
            mockUsers.filter((user)=>user[filter].includes(value))
        );
    return res.send(mockUsers);
});


export default router;