var user;

function me (newMe) {
    if (newMe) {
        user = newMe;
    }

    return user;
}

module.exports = me;
