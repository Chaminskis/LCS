module.exports = {
  up: function(migration, DataTypes, done) {
    
  	migration.createTable('hospitals',{
  		
        id:{ type: DataTypes.INTEGER, autoIncrement: true, unique:true },
		    name:{ type: DataTypes.STRING },
        details:{ type: DataTypes.STRING },
        address:{ type: DataTypes.STRING },
        local_phone:{ type: DataTypes.STRING },

        latitude:{ type: DataTypes.DECIMAL(6,4) },
        longitude:{ type: DataTypes.DECIMAL(6,4) },

        updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        deleted_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  	},{
  		engine:'INNODB',
        timestamps: true,
        paranoid: true,
        underscored: true,
  	})

    done()
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable('hospital')
    done()
  }
}
