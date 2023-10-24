import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mainRouter from './routes';

// Going to use Auth0 for authentication. It seems like a great way to get started with authentication, 
// especially for a small scale application. I have used JWT in the past, so I wanted to learn something new.
// Login works, but redirection is still having issues. I am going to try to get it working, but I may have to
import {auth, requiresAuth} from 'express-openid-connect';
import dotenv from 'dotenv';

dotenv.config();

// Port 8080
const port: string | number = process.env.PORT || 8080;
const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET as string,
  baseURL: process.env.BASE_URL as string,
  clientID: process.env.CLIENT_ID as string,
  issuerBaseURL: process.env.ISSUER_BASE_URL as string,
};

app
  .use(auth(config))
  .use(bodyParser.json())
  .use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', mainRouter);  
import db from './db';
db.mongoose.connect(db.url, {
})
.then(() => {
  app.listen(port, () => {
    console.log(`DB Connected and server running on ${port}.`);
  });
})
.catch((err: Error) => { 
  console.log('Cannot connect to the database!', err);
  process.exit();
});

app.get('/', (req: Request, res: Response) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/user', requiresAuth(), (req: Request, res: Response) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});