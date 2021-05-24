module.exports = (sequelize, Datatypes) => {

  const DeveloperType = sequelize.define('DeveloperType', {
    name: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'developer_types',
    updatedAt: true,
    createdAt: true
  });

  DeveloperType.associate = (model) => {
  };

  return DeveloperType;
};
