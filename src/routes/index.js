import passport from 'passport';
import router from '../controller/index.js';
import '../utils/middlewares/google.js';

const routes = (app) => {
  app.use(
    '/api/v1',
    router
  );
};

export default routes;
