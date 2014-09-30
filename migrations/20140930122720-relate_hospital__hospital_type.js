module.exports = {
  up: function(migration, DataTypes, done) {
    
    migration.addColumn(
      'hospitals',
      'hospital_type',
      {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: "hospital_types",
  			referenceKey: "id",
      }
    )

    done()
  },
  down: function(migration, DataTypes, done) {
    
    migration.removeColumn('hospitals', 'hospital_type')
    
    done()
  }
}
