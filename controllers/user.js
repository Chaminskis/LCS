
/*
 * Auth Users Api
 *
 *
 **/

var controllerBaseUrl = "/app/manage/auth/";

var utils = require('../definitions/utils_service.js');
var userService = require('../definitions/services/user_service.js');

var localFramework = null;

/** Routes **/
exports.install = function(framework){
    
    localFramework = framework;
    
    framework.route(controllerBaseUrl + 'user',index,['GET']);
	framework.route(controllerBaseUrl + 'user',save,['POST','JSON']);
	framework.route(controllerBaseUrl + 'login',login,['GET']);

    framework.route(controllerBaseUrl + 'user/delete/{id}/',remove,['DELETE']);
    framework.route(controllerBaseUrl + 'user/view/{id}/',view,['GET']);
}

function login(){
    this.json({'nice':':)'});
}

function remove(id){
    var self = this;
    
    userService.remove(id,function(result){
        self.json(utils.genericResponse(false,"",result));
    });
}

function view(id){
    
    var self = this;
    
    userService.get(id,function(item){
       self.json(utils.genericResponse(false,"",item));
    });
    
}

function index(){
    var self = this;
    
    userService.list(function(result){
        self.json(utils.genericResponse(false,"",result));
    });
}

function save(){
    var self = this;
    
    var model = self.post;
    
    model.password = localFramework.hash("sha512",model.password);
    
    userService.save(model,function(result){
        self.json(utils.genericResponse(false,"",result));
    });
}
