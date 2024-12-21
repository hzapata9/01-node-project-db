import { pool } from "./config/database";
import app from "./app";

const port = process.env.PORT || 3000;

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



