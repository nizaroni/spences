var habitat, env, nodeEnv;

habitat = require('habitat');

env = new habitat();
nodeEnv = env.get('nodeEnv');

if (!nodeEnv
        || nodeEnv === 'dev'
        || nodeEnv === 'test') {
    habitat.load(__dirname + '/../.env');
}

if (nodeEnv === 'test') {
    habitat.load(__dirname + '/../test.env');
}

module.exports = env;
