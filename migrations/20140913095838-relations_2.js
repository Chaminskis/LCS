module.exports = {
  up: function(migration, DataTypes, done) {
    
  	migration.createTable('hospital_doctors',{
  		hospital_id:{ 
  			type: DataTypes.INTEGER, 
  			unique:true, 
  			references: "hospitals",
  			referenceKey: "id",
  		},
  		doctor_id:{ 
  			type: DataTypes.INTEGER,
  			unique:true,
  			references: "doctors",
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
  	})

    done()
  },
  down: function(migration, DataTypes, done) {
    
  	migration.dropTable('hospital_doctors')

    done()
  }
}
