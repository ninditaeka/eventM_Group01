import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import authRouter from './routers/auth.router';
import eventRouter from './routers/event.router';
import referralCodeRouter from './routers/referralCode.router';
import userRouter from './routers/user.router';
import checkoutRouter from './routers/checkout.router';
import paymentRouter from './routers/payment.router';
import reviewRouter from './routers/review.router';

const bodyParser = require('body-parser');
export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json({ limit: '2mb' }));
    this.app.use(urlencoded({ limit: '2mb', extended: true }));
    this.app.use(express.static('public'));
    // this.app.use(express.json()); // to support JSON-encoded bodies
    // this.app.use(express.urlencoded()); // to support  URL-encoded bodies
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send('Error !');
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    this.app.use('/auth', authRouter);
    this.app.use('/api', referralCodeRouter);
    this.app.use('/events', eventRouter);
    this.app.use('/users', userRouter);
    this.app.use('/checkouts', checkoutRouter);
    this.app.use('/payments', paymentRouter);
    this.app.use('/reviews', reviewRouter);
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
