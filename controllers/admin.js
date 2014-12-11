/** Back office controller **/
var controllerBaseUrl = '/app/manage/';

exports.install = function(framework){
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
	
	var self = this;
	
	var auth = MODULE('auth');

    var user = { id: '1', alias: 'Peter' };

    auth.login(self, user.id, user);
	
	self.json({
		error:false,
		message:"Login nice :)",
		result:null
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