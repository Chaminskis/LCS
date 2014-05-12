//mysql connector
var mysql = require('mysql');
var pool  = mysql.createPool({ host: 'localhost', user: 'lcs-user', password: '_@qwerty@_' });

// override the framework prototype
framework.database = function(callback) {
	return pool.getConnection(callback);
};