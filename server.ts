import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mainRouter from './routes';

// Port 8080
const port: string | number = process.env.PORT || 8080;
const app = express();

app
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