var router;

router = require('../router');

function navigate (path) {
    path = path.charAt(0) === '/'
        ? path.slice(1)
        : path
    ;

    router.history.navigate(path, { trigger: true });
}

module.exports = navigate;
