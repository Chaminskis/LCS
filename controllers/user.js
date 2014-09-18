
/*
 * Auth Users Api
 *
 *
 **/

var controllerBaseUrl = "/app/manage/auth/user/";
var userService = require('../definitions/services/user_service.js');

/** Routes **/
exports.install = function(framework){
    
    framework.route(controllerBaseUrl + '',index,['GET']);
	framework.route(controllerBaseUrl + '',save,['POST','JSON']);
}

function index(){
    var self = this;
    
    userService.get(function(items){
        self.json({
            'controller':'User Service controller :)',
            'result':items
        });
    });
}

function save(){
    var self = this;
    
    var model = self.post;
    
    model.password = framework.hash("sha512",model.password);
    
    userService.save(model,function(item){
        self.json({
            'controller':'User Service controller save :)',
            'result':item,
        });
    });
    
}
