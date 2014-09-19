
/*
 * Auth Users Api
 *
 *
 **/

var controllerBaseUrl = "/app/manage/auth/user/";
var userService = require('../definitions/services/user_service.js');
var localFramework = null;
/** Routes **/
exports.install = function(framework){
    
    localFramework = framework;
    
    framework.route(controllerBaseUrl + '',index,['GET']);
	framework.route(controllerBaseUrl + '',save,['POST','JSON']);

    framework.route(controllerBaseUrl + 'delete/{id}/',remove,['DELETE']);
    framework.route(controllerBaseUrl + 'view/{id}/',view,['GET']);
}

function remove(id){
    var self = this;
    
    userService.remove(id,function(result){
        self.json({
            'controller':'User service controller remove :)',
            'result':result
        });
    });
}

function view(id){
    
    var self = this;
    
    userService.get(id,function(item){
       self.json({
           'controller':'User service controller get :)',
           result:item,
       }); 
    });
    
}

function index(){
    var self = this;
    
    userService.list(function(items){
        self.json({
            'controller':'User Service controller :)',
            'result':items
        });
    });
}

function save(){
    var self = this;
    
    var model = self.post;
    
    model.password = localFramework.hash("sha512",model.password);
    
    userService.save(model,function(item){
        self.json({
            'controller':'User Service controller save :)',
            'result':item,
        });
    });
    
}
