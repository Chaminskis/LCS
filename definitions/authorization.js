framework.on('install', function(type, name) {

    if (type !== 'module' && name !== 'auth')
        return;

    var auth = MODULE('auth');

    auth.onAuthorization = function(id, callback, flags) {

        // - this function is cached
        // - here you must read user information from a database
        // - insert the user object into the callback (this object will be saved to session/cache)
        callback({ id: '1', alias: 'test nice' });

        // if user not exist then
        // callback(null);
    };

});