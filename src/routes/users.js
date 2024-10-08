import { Router } from "express";
import { query, checkSchema, validationResult, matchedData} from "express-validator"
import { createQuerySchema, createUserValidationSchema } from "../utils/validationSchemas.js";
import { mockUsers } from "../utils/constants.js";
import { resolveUserByIndex } from "../utils/middlewares.js";

const router = Router();

router.get("/",(req,res)=>{
    // res.cookie("hello","world",{maxAge: 60000, signed: true});
    console.log(req.session);
    console.log(req.sessionID);
    req.session.visited = true;
    res.status(201).send({msg:"Hello"});
});

router.get("/api/users/:id", resolveUserByIndex, (req,res)=>{
    const {findUserIndex} = req;
    const findUser = mockUsers[findUserIndex];
    if(!findUser) return res.sendStatus(404);
    return res.send(mockUsers[findUserIndex]);
});

router.get("/api/users", checkSchema(createQuerySchema), (req,res)=>{
    const {query:{filter, value}} = req;
    const result = validationResult(req);
    console.log(result);
    console.log(req.session);
    console.log(req.session.id);

    // if(!result.isEmpty())
    //     return res.status(400).send({errors: result.array()});
    
    if( filter && value){
        return res.send(
            mockUsers.filter((user)=>user[filter].includes(value))
        );
    }
    return res.send(mockUsers);
});

router.post('/api/users',checkSchema(createUserValidationSchema),(req,res)=>{
    const result = validationResult(req);
    console.log(result);

    if(!result.isEmpty())
        return res.status(400).send({errors: result.array()});

    const data = matchedData(req);
    const newUser = {id: mockUsers[mockUsers.length-1].id + 1, ...data};
    mockUsers.push(newUser);
    return res.status(201).send(newUser);
});


router.put("/api/users/:id",resolveUserByIndex,(req,res)=>{
    const {body,findUserIndex} = req;
    mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body};
    return res.sendStatus(201);
});

router.patch("/api/users/:id",resolveUserByIndex,(req,res)=>{
    const {body, findUserIndex} = req;
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body};
    return res.sendStatus(201);
});

router.delete("/api/users/:id",resolveUserByIndex,(req,res)=>{
    const {findUserIndex} = req;
    
    if(findUserIndex === -1)
        return res.status(400);

    mockUsers.splice(findUserIndex,1);
    return res.sendStatus(204);
}); 

export default router;