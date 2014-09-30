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

var User = sequelize.define('auth_users',{
	id:{ type: Sequelize.INTEGER, autoIncrement: true, unique:true, },
	user:{ type: Sequelize.STRING, unique:true, },
	password: Sequelize.STRING,
	mail:{ type:Sequelize.STRING, unique:true, },
},extraOptions);

var HospitalType = sequelize.define('hospital_type',{
	
	//unique
	id:{ type: Sequelize.INTEGER, autoIncrement: true },
	
	//unique name
	name:{ type: Sequelize.STRING },
	
	// name to show
	details:{ type: Sequelize.STRING },
	
},extraOptions);

var Hospital = sequelize.define('hospital',{
	id:{ type: Sequelize.INTEGER, autoIncrement: true },
	name:{ type: Sequelize.STRING },
	
	details: Sequelize.STRING,
	address: Sequelize.STRING,
	
	hospital_type:{ type: Sequelize.INTEGER },
	
	latitude: Sequelize.DECIMAL(6,4),
	longitude: Sequelize.DECIMAL(6,4),
},extraOptions);


var MedicalSecure = sequelize.define('medical_secure',{
	id:{ type: Sequelize.INTEGER, autoIncrement: true },
	name: Sequelize.STRING,
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


Hospital.belongsTo(HospitalType, { as : 'HospitalType', foreignKey : 'hospital_type' });

HospitalType.hasMany(Hospital, { onDelete: 'SET NULL', onUpdate: 'CASCADE' });

/** Export module **/
module.exports = {
	User:User,
	Hospital:Hospital,
	MedicalSecure:MedicalSecure,
	Doctor:Doctor,
	Sequelize:sequelize,
	HospitalType:HospitalType,
};


