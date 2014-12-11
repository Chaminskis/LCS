/** Back office controller **/
var controllerBaseUrl = '/app/manage/';

var userService = require('../definitions/services/user_service.js');
var localFramework = null;

exports.install = function(framework){
	
	localFramework = framework;
	
	framework.route(controllerBaseUrl + "",index,['authorize']);
	framework.route(controllerBaseUrl + "login",login,['unauthorize']);
	framework.route(controllerBaseUrl + "auth/login",auth_login,['POST','JSON','unauthorize']);
	framework.route(controllerBaseUrl + "auth/logout",auth_logout,['GET','authorize']);
	
	framework.route(controllerBaseUrl + "test",test);
};

function wrapHandler(){
	
	var args = [];
    
    for(var key in arguments){
        args.push(arguments[key]);
    }
	
	var self = args[0];
	var handler = args[1];
	
	console.log(self.layout);
	
	handler.call(self,args.slice(2));
}

function auth_logout(){
	//keep this auth tutorial
	//https://github.com/totaljs/modules/tree/master/auth
	
	//and this one too
	//http://docs.totaljs.com/how-does-it-work/authorization/
	
	var self = this;
    var auth = MODULE('auth');
    var user = self.user;

    auth.logoff(self, user.id);
    
    self.redirect('/');
}

function auth_login(){
	
	var auth = MODULE('auth');
	var self = this;
	
	var user = self.post.user;
	var password = self.post.password;
	
	console.log("this is password hola mundo");
	console.log(self.post);
	
	password = localFramework.hash("sha512",password);
	
	console.log("this is password hola mundo 2");
	
	console.log("this is password ",password);

	userService.login(user,password,function(user){
		if(user !== null){
			
		    auth.login(self, user.id, user);

			self.json({
				error:false,
				message:"success",
				result:null
			});			
			return;
		}
		
		self.json({
			error:true,
			message:"fail",
			result:null
		});	
	});
}

function index(){
	var self = this;

	/** Log user info **/
	var user = self.user;
	
	console.log(user);

	console.log("nitido en el nintendo :) ");

	self.layout("");
	
	self.view('index');
}

function login(){
	
	var self = this;
	
	self.layout("");
	
	self.view("login");
}

function test(){
	var self = this;

	self.layout("");

	self.view('index');
}