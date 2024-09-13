import express from "express";
import {query, validationResult, body, matchedData, checkSchema} from "express-validator";
import { createUserValidationSchema, createQuerySchema } from "./utils/validationSchemas.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

//Creating a Middleware
const loggingMiddleware = (req,res,next)=>{
    console.log(req.method+" "+req.url);
    next();
}

const mockUsers = [{id: 1,uName:"Alok", gpa: 3.8},
    {id: 2,uName:"Bhargav", gpa: 4.0},
    {id: 3,uName:"Chaitu", gpa: 5.0},
    {id: 4,uName:"Abhi", gpa: 7.0}]

const resolveUserByIndex = (req,res,next)=>{
    const {body, params: {id}} = req;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return res.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user)=> user.id === parsedId);
    if(findUserIndex === -1) return res.sendStatus(400);
    req.findUserIndex = findUserIndex;
    next();
}

// Using Middleware for all requests
app.use(loggingMiddleware);

app.get("/",(req,res,next)=>{
    console.log("Hello Sir I wont let u go to next Middleware");
    next();
},(req,res)=>{
    res.status(201).send({msg:"Hello"});
});

app.get("/api/users", checkSchema(createQuerySchema), (req,res)=>{
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

app.post('/api/users',checkSchema(createUserValidationSchema),(req,res)=>{
        const result = validationResult(req);
        console.log(result);

        if(!result.isEmpty())
            return res.status(400).send({errors: result.array()});

        const data = matchedData(req);
        const newUser = {id: mockUsers[mockUsers.length-1].id + 1, ...data};
        mockUsers.push(newUser);
        return res.status(201).send(newUser);
});

app.get("/api/users/:id",(req,res)=>{
    const {findUserIndex} = req;
    const findUser = mockUsers[findUserIndex];
    if(!findUser) return res.sendStatus(404);
    return res.send(mockUsers[findUserIndex]);
});

app.put("/api/users/:id",resolveUserByIndex,(req,res)=>{
    const {body,findUserIndex} = req;
    mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body};
    return res.sendStatus(201);
});

app.patch("/api/users/:id",resolveUserByIndex,(req,res)=>{
    const {body, findUserIndex} = req;
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body};
    return res.sendStatus(201);
});

app.delete("/api/users/:id",resolveUserByIndex,(req,res)=>{
    const {findUserIndex} = req;
    mockUsers.splice(findUserIndex,1);
    return res.status(204);
}); 

app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
});