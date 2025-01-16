type User = {
  email: string;
  role: string;
  id: string;
};

declare namespace Express {
  export interface Request {
    user?: User;
  }
}
