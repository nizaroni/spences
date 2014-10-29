var habitat, env, nodeEnv;

habitat = require('habitat');

env = new habitat();
nodeEnv = env.get('nodeEnv');

if (!nodeEnv || nodeEnv === 'dev') {
    habitat.load(__dirname + '/../.env');
}

module.exports = env;
