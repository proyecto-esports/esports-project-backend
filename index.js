import config from 'config-yml';

import app from './src/server';
import magic from './src/utils/magic';

app.listen(config.port, () => {
  magic.LogInfo(`Server running on http://localhost:${config.port}`);
});

app.on('err', (err) => {
  magic.LogDanger(err);
});
