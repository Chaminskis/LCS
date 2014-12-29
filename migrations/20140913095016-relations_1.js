module.exports = {
  up: function(migration, DataTypes, done) {
    
  	migration.createTable('hospital_insurances',{
  		hospital_id:{ 
  			type: DataTypes.INTEGER, 
  			references: "hospitals",
  			referenceKey: "id",
  		},
  		medical_secure_id:{ 
  			type: DataTypes.INTEGER,
  			references: "medical_insurances",
  			referenceKey: "id",
  		},
  		updated_at: { 
  		  type: DataTypes.DATE, 
  		  defaultValue: DataTypes.NOW 
  		},
      created_at: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
      },
      deleted_at: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
      },
  	});

    done();
  },
  down: function(migration, DataTypes, done) {
  	
  	migration.dropTable('medical_insurances');

    done();
  }
}
