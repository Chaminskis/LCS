module.exports = {
  up: function(migration, DataTypes, done) {
    
  	migration.createTable('hospital_secures',{
  		hospital_id:{ 
  			type: DataTypes.INTEGER, 
  			unique:true, 
  			references: "hospitals",
  			referenceKey: "id",
  		},
  		secure_id:{ 
  			type: DataTypes.INTEGER,
  			unique:true,
  			references: "medical_secures",
  			referenceKey: "id",
  		},
  	})

    done()
  },
  down: function(migration, DataTypes, done) {
  	
  	migration.dropTable('hospital_secures')

    done()
  }
}
