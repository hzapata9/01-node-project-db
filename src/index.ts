import express from "express";
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route"
import { pool } from "./config/database";
import { httpErrorHandle } from "./middlewares/httpErrorHandle.middleware";

import openapiSpecification from "./config/swagger";
import swaggerUi from "swagger-ui-express";


const app = express();
const port = process.env.PORT || 3000;

// Swagger config
var options = {
    explorer: true
};
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification, options));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

// No usar esta ruta antes de otras
app.use(httpErrorHandle);


const main = async () => {
    try {
        const { rows } = await pool.query("SELECT NOW()");
        console.log(rows, " ===> DB Conected \n");
        app.listen(3000, () => {
            console.log("Server is running on Port:" + port);
        });
    } catch (error) {
        console.log(error);
    }
};

main();



