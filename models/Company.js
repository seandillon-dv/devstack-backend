module.exports = (sequelize, Datatypes) => {

  const Company = sequelize.define('Company', {
    name: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true,
    },
    photo_path: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'companies',
    updatedAt: true,
    createdAt: true
  });

  Company.associate = (model) => {
    Company.hasOne(model.CompanyCredentials);
  };

  return Company;
};
