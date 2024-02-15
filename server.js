import dotenv from 'dotenv';
import { app } from './app.js';

if(process.env.NODE_ENV === "production" || !process.env.NODE_ENV) {
	dotenv.config();
} else {
	dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
}

app.listen(process.env.PORT, () => console.log(`server listening on http://127.0.0.1:${process.env.PORT}`));
