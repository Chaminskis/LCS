/** Back office controller **/
var controllerBaseUrl = '/app/manage/';

exports.install = function(framework){
	framework.route(controllerBaseUrl + "",index);
	framework.route(controllerBaseUrl + "login",login);
	
	framework.route(controllerBaseUrl + "test",test);
}

function index(){
	var self = this;

	console.log("nitido en el nintendo");

	self.layout("");
	
	self.view('index')
}

function login(){
	
	var self = this;
	
	self.layout("");
	
	self.view("login");
}

function test(){
	var self = this;

	self.layout("")

	self.view('index')
}