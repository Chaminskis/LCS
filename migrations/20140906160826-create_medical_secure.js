module.exports = {
  up: function(migration, DataTypes, done) {
    
  	migration.createTable('medical_insurance',{
  		  id:{ type: DataTypes.INTEGER, autoIncrement: true, unique:true },
		    name: DataTypes.STRING,
        details: DataTypes.STRING,
        local_phone: DataTypes.STRING,
        logo_picture: DataTypes.STRING,
        updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        deleted_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  	},{
  		engine:'INNODB',
        timestamps: true,
        paranoid: true,
        underscored: true,
  	});

    done();
  },
  down: function(migration, DataTypes, done) {
    
    migration.dropTable('medical_secure');

    done();
  }
};
