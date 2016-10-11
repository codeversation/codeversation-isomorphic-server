import { DB_URI } from 'server/config';

// initialize mongoose - mongodb connection
import mongoose from 'mongoose';
//mongoose.connect(DB_URI);

import express from 'express';
const app = express();

// set view engine and view folder
app.set('views', './views');
app.set('view engine', 'jade');

// set middleware
import headerMiddleware from 'server/middleware/header';

app.use(headerMiddleware);

// set routes
import authRouter from 'server/routes/auth';
import jsRouter from 'server/routes/javascript';
import isoRouter from 'server/routes/isomorphic';

app.use('/v1/user', authRouter);
app.use('/js', jsRouter);
app.use ('/', isoRouter);





export default app;
