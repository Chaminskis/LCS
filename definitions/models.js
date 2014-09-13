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

var User = sequelize.define('user',{
	id:{ type: Sequelize.INTEGER, autoIncrement: true, unique:true, },
	user:{ type: Sequelize.STRING, unique:true, },
	password: Sequelize.STRING,
	mail:{ type:Sequelize.STRING, unique:true, },
},extraOptions);

var Hospital = sequelize.define('hospital',{
	id:{ type: Sequelize.INTEGER, autoIncrement: true },
	title:{ type: Sequelize.STRING },
	details: Sequelize.STRING,
},extraOptions);


var MedicalSecure = sequelize.define('medical_secure',{
	id:{ type: Sequelize.INTEGER, autoIncrement: true },
	title: Sequelize.STRING,
	details: Sequelize.STRING,
},extraOptions);

var Doctor = sequelize.define('doctor',{
	id:{ type: Sequelize.INTEGER, autoIncrement: true },
	name: Sequelize.STRING,
	last: Sequelize.STRING,
	details: Sequelize.STRING,
},extraOptions);


/**  hospital * ->  * Secure  **/
Hospital.hasMany(MedicalSecure,{as:'Secures',through:'hospital_secures'});

MedicalSecure.hasMany(Hospital,{as:'Hospitals',through:'hospital_secures'});


/**  hospital * ->  * Doctors  **/
Hospital.hasMany(Doctor,{as:'Doctors',through:'hospital_doctors'});

Doctor.hasMany(Hospital,{as:'Hospitals',through:'hospital_doctors'});



/** Export module **/
module.exports = {
	User:User,
	Hospital:Hospital,
	MedicalSecure:MedicalSecure,
	Doctor:Doctor,
};