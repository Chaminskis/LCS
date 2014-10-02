/*
 * User Service
 *
 *
 **/

module.exports = (function(){
    
    /** Private context **/
    var models = require('../models.js');
    
    var dateTimeFields = ['updated_at','deleted_at','password'];
	
	var removeFields = function(entity){
		
		dateTimeFields.forEach(function(field){
			delete entity[field];
		});
		
		return entity;
	};
    
    var find = function(callback){
        models.User.findAll().success(function(result){
            
            var cleanResult = result.map(function(item){
                return removeFields(item.dataValues);
            });
            
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
    
    var login = function(user,password,callback){
        models.User.find({ 
            where:{ 
                'user':user,
                'password':password   
            }
        }).success(function(result){
            callback(result);
        }).error(function(error){
           callback(error); 
        });
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
        },
        login:function(user,password,callbackResponse){
            login(user,password,callbackResponse);
        }
    };
})(); 
