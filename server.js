import dotenv from "dotenv";
import { app } from "./app.js";
import { createDBConn } from "./db/index.js";
import logger from "./utils/Logger.js";

if(process.env.NODE_ENV === "production" || !process.env.NODE_ENV) {
	dotenv.config();
} else {
	dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
}

export const db = createDBConn();
	
db.authenticate()
	.then(() => { 
		logger.INFO("successfully connected to DB");
	})
	.catch((err) => logger.ERROR("Failed to connect to db", err));

app.listen(process.env.PORT, () => console.log(`server listening on http://127.0.0.1:${process.env.PORT}`));
