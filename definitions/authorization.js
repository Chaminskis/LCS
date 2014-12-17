var userService = require('../definitions/services/user_service.js');

framework.on('install', function(type, name) {

    if (type !== 'module' && name !== 'auth')
        return;

    var auth = MODULE('auth');

    auth.onAuthorization = function(id, callback, flags) {

        // - this function is cached
        // - here you must read user information from a database
        // - insert the user object into the callback (this object will be saved to session/cache)
        
        userService.get(id,function(user){
            
            if(user === null){
                callback(null);
                return;
            }
            
            callback({ id: id, user: user });
        });
    };
});