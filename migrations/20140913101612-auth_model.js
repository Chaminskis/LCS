module.exports = {
  up: function(migration, DataTypes, done) {
    
	migration.createTable('auth_users',{
  		id:{ 
  			type: DataTypes.INTEGER, 
  			unique:true, 
  			autoIncrement: true,
  		},
  		user:{ 
  			type: DataTypes.STRING,
  			unique:true, 
  		},
  		password:{ 
  			type: DataTypes.STRING,
  		},
  		mail:{ 
  			type: DataTypes.STRING,
  			unique:true, 
  		},
  		updated_at: { 
  		  type: DataTypes.DATE, defaultValue: DataTypes.NOW 
  		},
      created_at: { 
        type: DataTypes.DATE, defaultValue: DataTypes.NOW 
      },
      deleted_at: { 
        type: DataTypes.DATE, defaultValue: DataTypes.NOW 
      },
  	})

    done()
  },
  down: function(migration, DataTypes, done) {
    
    done()
  }
}
