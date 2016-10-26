import express from 'express';
import { V1_API_BASE } from 'config';

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
import codeversationRouter from 'server/routes/codeversation';
import commentRouter from 'server/routes/comment';
import userRouter from 'server/routes/user';
import sessionRouter from 'server/routes/session'
import jsRouter from 'server/routes/javascript';
import isoRouter from 'server/routes/isomorphic';
import testRouter from 'server/routes/test';

app.use(`${V1_API_BASE}/codeversation`, codeversationRouter);
app.use(`${V1_API_BASE}/comment`, commentRouter);
app.use(`${V1_API_BASE}/user`, userRouter);
app.use(`${V1_API_BASE}/session`, sessionRouter);
app.use(`${V1_API_BASE}/test`, testRouter);

app.use('/', jsRouter);
app.use('/', isoRouter);

export default app;
