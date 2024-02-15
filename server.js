import dotenv from 'dotenv';
import { app } from './app.js';
import { createDBConn } from './db/db.js';

if(process.env.NODE_ENV === "production" || !process.env.NODE_ENV) {
	dotenv.config();
} else {
	dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
}

export const db = createDBConn();
	
db.authenticate()
	.then(() => console.log("successfully connected to DB"))
	.catch((err) => console.log("Failed to connect to db", err));

app.listen(process.env.PORT, () => console.log(`server listening on http://127.0.0.1:${process.env.PORT}`));
