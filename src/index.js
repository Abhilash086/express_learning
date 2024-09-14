import express from "express";
import usersRouter from "./routes/users.js";
import { loggingMiddleware } from "./utils/middlewares.js";
import productRoutes from "./routes/products.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Using Middleware for all requests
app.use(loggingMiddleware);

// Registering the usersRouter to access it here from router level
app.use(usersRouter);
app.use(productRoutes);

app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
});