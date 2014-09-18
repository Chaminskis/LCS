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
        }).error(function(error){
            callback(error);
        });;
    };
    
    var save = function(model,callback){
        models.User.create({
            user:model.user,
            password: model.password,
            mail:model.mail
        }).success(function(item){
            console.log(arguments);
            callback(item);
        }).error(function(error){
            callback(error);
        });
    };
    
    var remove = function(userId,callback){
        models.User.destroy({
            id:userId
        }).success(function(item){
            callback(item);
        }).error(function(error){
            callback(error);
        });;
    };
    
    var get = function(userId,callback){
        models.User.find(userId).success(function(item){
            callback(item);
        }).error(function(error){
            callback(error);
        });;
    };
    
    /** Public context **/
    return {
        list:function(callbackResponse){
            find(callbackResponse);
        },
        save:function(model,callbackResponse){
            save(model,callbackResponse);
        },
        remove:function(id,callbackResponse){
            remove(id,callbackResponse);
        },
        get:function(id,callbackResponse){
            get(id,callbackResponse);
        }
    };
})(); 
