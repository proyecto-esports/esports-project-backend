import passport from 'passport';
import router from '../controller/index.js';
import '../utils/middlewares/google.js';

const routes = (app) => {
  app.use(
    '/api/v1',
    passport.authenticate("auth-google", {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
      session: false,
    }),
    router
  );
};

export default routes;
