module.exports = (sequelize, Datatypes) => {

  const CompanyCredentials = sequelize.define('CompanyCredentials', {
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
    tableName: 'company_credentials',
    updatedAt: true,
    createdAt: true
  });

  CompanyCredentials.associate = (model) => {
    CompanyCredentials.belongsTo(model.Company);
  };

  return CompanyCredentials;
};
