import config from 'config-yml';

import app from './src/server/index.js';

import { LogInfo, LogDanger } from './src/utils/magic.js';

app.listen(config.port, () => {
  LogInfo(`Server running on http://localhost:${config.port}`);
});

app.on('err', (err) => {
  LogDanger(err);
