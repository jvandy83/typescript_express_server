import { Router, Request, Response, NextFunction } from 'express';
import { controller, get, use, bodyValidator, post } from './decorators';

export const router = Router();

const requireAuth = function () {
  return (req: Request, res: Response, next: NextFunction) => {
    req.session && req.session.loggedIn
      ? next()
      : res.status(403).send('Not Authorized');
  };
};

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" />
      </div>
      <button>Submit</button>
      <a href="/auth">Home</a>
    </form>
  `);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (email === 'test@test' && password === '123') {
      req.session = { loggedIn: true };
      return res.redirect('/auth');
    }
    res.status(422).send('User not found');
  }

  @get('/')
  getAuth(req: Request, res: Response) {
    const isLoggedIn = req.session && req.session.loggedIn;
    res.send(`
    <div>
      <h1>${isLoggedIn ? 'You are logged in...' : 'You are logged out...'}</h1>
        <a href=${isLoggedIn ? '/auth/logout' : '/auth/login'}>${
      isLoggedIn ? 'logout' : 'login'
    } </a>
    <a href="/auth/protected">protected</a>
    </div>
  `);
  }

  @get('/protected')
  @use(requireAuth())
  getProtected(req: Request, res: Response) {
    res.send('This route is protected...');
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    if (req.session) {
      req.session.loggedIn = undefined;
    }
    res.redirect('/auth');
  }
}
