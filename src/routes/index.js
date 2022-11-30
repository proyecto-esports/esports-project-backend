import router from '../controller/index';

const routes = (app) => {
  app.use('/api/v1', router);
};

export default routes;
