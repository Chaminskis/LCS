/*
 * User Service
 *
 *
 **/

module.exports = (function(){
    
    /** Private context **/
    var models = require('../models.js');
    
    
    var find = function(callback){
        models.User.findAll().success(function(result){
            callback(result);
        });
    }
    
    var save = function(model,callback){
        
        var password = framework.hash("sha512",model.password);
        
        models.User.create({
            user:model.user,
            password: password,
            mail:model.mail
        }).success(function(item){
            callback(item);
        });
    }
    
    /** Public context **/
    return {
        get:function(callbackResponse){
            find(callbackResponse);
        },
        save:function(model,callbackResponse){
            save(model,callbackResponse);
        }
    };
})(); 
