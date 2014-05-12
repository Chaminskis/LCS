//utils

module.exports = {
	genericResponse:function(error,message,result){
		return{
			error:error,
			message:message,
			result:result
		}
	}
}