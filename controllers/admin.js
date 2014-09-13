/** Back office controller **/
var controllerBaseUrl = '/app/manage/';

exports.install = function(framework){
	framework.route(controllerBaseUrl + "",index);
	framework.route(controllerBaseUrl + "test",test);
}

function index(){
	var self = this;

	self.layout("")

	self.view('index')
}
