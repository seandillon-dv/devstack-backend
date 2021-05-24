module.exports = (sequelize, Datatypes) => {

  const Developer = sequelize.define('Developer', {
    email: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true,
    },
    first_name: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    linkedin: {
      type: Datatypes.STRING,
      allowNull: true,
    },
    github: {
      type: Datatypes.STRING,
      allowNull: true,
    },
    bio: {
      type: Datatypes.TEXT,
      allowNull: true,
    },
    photo_path: {
      type: Datatypes.STRING,
      allowNull: true,
    },
    min_salary: {
      type: Datatypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'developers',
    updatedAt: true,
    createdAt: true
  });

  Developer.associate = (model) => {
    Developer.hasOne(model.DeveloperCredentials);

    Developer.hasMany(model.EmploymentHistory, {foreignKey: 'developer_id', as: 'employment_history'});
    Developer.hasMany(model.EducationHistory, {foreignKey: 'developer_id', as: 'education_history'});

    Developer.belongsTo(model.Country, {
      foreignKey: {
        name: 'country_id',
        allowNull: false,
      },
      as: 'country',
      onDelete: 'cascade'
    });

    Developer.belongsTo(model.DeveloperType, {
      foreignKey: {
        name: 'developer_type_id',
        allowNull: false,
      },
      as: 'developer_type',
      onDelete: 'cascade'
    });

    Developer.belongsTo(model.ExperienceLevel, {
      foreignKey: {
        name: 'experience_level_id',
        allowNull: false,
      },
      as: 'experience_level',
      onDelete: 'cascade'
    });

    Developer.belongsToMany(model.Technology, { as: 'technologies', through: 'DeveloperTechnologies'} );
    Developer.belongsToMany(model.Country, { as: 'eligible_countries', through: 'DeveloperEligibleCountries'});
  };

  return Developer;
};
