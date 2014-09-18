module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished

    migration.createTable('doctors',{
  		id:{ type: DataTypes.INTEGER, autoIncrement: true, unique:true },
		name: DataTypes.STRING,
		last: DataTypes.STRING,
		details: DataTypes.STRING,
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    deleted_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  	},{
  		engine:'INNODB',
        timestamps: true,
        paranoid: true,
        underscored: true,
  	});

    done()
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    
    migration.dropTable('doctor')

    done()
  }
}
