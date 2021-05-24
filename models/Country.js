module.exports = (sequelize, Datatypes) => {

  const Country = sequelize.define('Country', {
    name: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true,
    },
    region: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'countries',
    updatedAt: true,
    createdAt: true
  });

  Country.associate = (model) => {
  };

  return Country;
};
