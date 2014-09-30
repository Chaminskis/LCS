module.exports = {
  up: function(migration, DataTypes, done) {
    
    migration.createTable('hospital_types',{
      
    		id:{ 
    			type: DataTypes.INTEGER, 
    			unique:true, 
    			autoIncrement: true,
    		},
		  	name:{ 
    			type: DataTypes.STRING,
    			unique:true, 
    		},
        details:{ 
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
    });
    
    done()
  },
  down: function(migration, DataTypes, done) {
    
    migration.dropTable('hospital_types');
    
    done()
  }
}
