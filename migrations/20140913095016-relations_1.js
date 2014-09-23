module.exports = {
  up: function(migration, DataTypes, done) {
    
  	migration.createTable('hospital_secures',{
  		hospital_id:{ 
  			type: DataTypes.INTEGER, 
  			references: "hospitals",
  			referenceKey: "id",
  		},
  		medical_secure_id:{ 
  			type: DataTypes.INTEGER,
  			references: "medical_secures",
  			referenceKey: "id",
  		},
  		updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      deleted_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  	})

    done()
  },
  down: function(migration, DataTypes, done) {
  	
  	migration.dropTable('hospital_secures')

    done()
  }
}
