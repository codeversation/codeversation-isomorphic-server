import express from 'express';
const app = express();

// set view engine and view folder
app.set('views', './views');
app.set('view engine', 'jade');

// set middleware
import bodyParser from 'body-parser';
import headerMiddleware from 'server/middleware/header';
import authMiddleware from 'server/middleware/auth';

app.use(bodyParser.json());
app.use(headerMiddleware);
app.use(authMiddleware);

// set routes
import userRouter from 'server/routes/user';
import sessionRouter from 'server/routes/session'
import jsRouter from 'server/routes/javascript';
import isoRouter from 'server/routes/isomorphic';
import compilerRouter from 'server/routes/compiler';


app.use('/v1/user', userRouter);
app.use('/v1/session', sessionRouter);
app.use('/v1/compiler', compilerRouter);
app.use('/js', jsRouter);
app.use ('/', isoRouter);

export default app;
