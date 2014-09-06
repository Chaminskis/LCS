module.exports = {
  up: function(migration, DataTypes, done) {
    
  	migration.createTable('hospitals',{
  		id:{ type: DataTypes.INTEGER, autoIncrement: true, unique:true },
		title:{ type: DataTypes.STRING },
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
