import router from '../controller/index.js';

const routes = (app) => {
  app.use('/api/v1', router);
};

export default routes;
