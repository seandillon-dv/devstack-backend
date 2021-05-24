module.exports = (sequelize, Datatypes) => {

  const ExperienceLevel = sequelize.define('ExperienceLevel', {
    name: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'experience_levels',
    updatedAt: true,
    createdAt: true
  });

  ExperienceLevel.associate = (model) => {
  };

  return ExperienceLevel;
};
