/*
 * Models
 *
 **/

var Sequelize = require("sequelize")
var sequelize = require('./database.js');

var extraOptions = {

	// avoid delete value
	paranoid: true,

	engine:'INNODB',
}

var Hospital = sequelize.define('hospital',{
	id:{ type: Sequelize.INTEGER, autoIncrement: true },
	title:{ type: Sequelize.STRING },
},extraOptions)


var MedicalSecure = sequelize.define('medical_secure',{
	id:{ type: Sequelize.INTEGER, autoIncrement: true },
	title: Sequelize.STRING,	
},extraOptions)


/** Export module **/
module.exports = {
	Hospital:Hospital,
	MedicalSecure:MedicalSecure,
};