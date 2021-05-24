module.exports = (sequelize, Datatypes) => {

  const DeveloperCredentials = sequelize.define('DeveloperCredentials', {
    // * TO BE HASHED WITH BCRYPT
    username: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true,
    },
    // * TO BE HASHED WITH BCRYPT
    password: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'developer_credentials',
    updatedAt: true,
    createdAt: true
  });

  DeveloperCredentials.associate = (model) => {
    DeveloperCredentials.belongsTo(model.Developer);
  };

  return DeveloperCredentials;
};
