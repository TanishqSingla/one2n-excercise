import express from 'express';
import { router as v1Router } from './routes/v1/routes.js';
import expressBang from 'express-bang';
import { errorHandler } from './middlewares/errorHandler.js';
import { requestInterceptor } from './middlewares/interceptor.js';

export const app = express();

app.use(expressBang());
if(["development", "staging"].includes(process.env.NODE_ENV)) {
	app.use(requestInterceptor);
}

app.use("/v1/", v1Router);

app.use(errorHandler());
