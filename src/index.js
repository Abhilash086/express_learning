import express from "express";
import usersRouter from "./routes/users.js";
import { loggingMiddleware } from "./utils/middlewares.js";
import productRoutes from "./routes/products.js";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Using Middleware for all requests
app.use(loggingMiddleware);
app.use(cookieParser('helloworld'));
app.use(session({
    secret: "Abhi the dev",
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: 60000 * 60
    },
}));

// Registering the usersRouter to access it here from router level
app.use(usersRouter);
app.use(productRoutes);

app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
});