/*
 *
 *
 **/
 var Sequelize = require("sequelize")
 var config = require('./config.js')['dev']

var database = config.database;
var user = config.user;
var password = config.password
var host = config.host

var sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
    define: { 
	  	underscored: true,
	    charset: 'utf8',
	    timestamps: true,
	    engine:'INNODB',
    },
    pool: { 
    	maxConnections: 10, 
    	maxIdleTime: 300
    },
})

module.exports = sequelize;