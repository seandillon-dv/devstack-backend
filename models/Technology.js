module.exports = (sequelize, Datatypes) => {

  const Technology = sequelize.define('Technology', {
    name: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true,
    },
    path: {
      type: Datatypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'technologies',
    updatedAt: true,
    createdAt: true
  });

  Technology.associate = (model) => {
  };

  return Technology;
};
