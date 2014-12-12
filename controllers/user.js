
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
    
    framework.route(controllerBaseUrl + 'user',index,['GET','authorize']);
	framework.route(controllerBaseUrl + 'user',save,['POST','JSON','authorize']);
	framework.route(controllerBaseUrl + 'login',login,['GET','authorize']);

    framework.route(controllerBaseUrl + 'user/delete/{id}/',remove,['DELETE','authorize']);
    framework.route(controllerBaseUrl + 'user/view/{id}/',view,['GET','authorize']);
}

function login(){
    
    var self = this;
    
    var model = self.post;
    
    model.password = localFramework.hash("sha512",model.password);
    
    userService.login(model.user,model.password,function(result){
        self.json(utils.genericResponse(false,"",result));
    });
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
