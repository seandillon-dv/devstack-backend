module.exports = (sequelize, Datatypes) => {

  const Message = sequelize.define('Message', {
    text_content: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: Datatypes.DATE,
      allowNull: false,
      default: Date.now()
    },
    is_from_developer: {
      type: Datatypes.BOOLEAN,
      allowNull: false
    },
    was_read_by_company: {
      type: Datatypes.BOOLEAN,
      default: false
    },
    was_read_by_developer: {
      type: Datatypes.BOOLEAN,
      default: false
    }
  }, {
    tableName: 'messages',
    updatedAt: false,
    createdAt: false
  });

  Message.associate = (model) => {

    Message.belongsTo(model.Developer, {
      foreignKey: {
        name: 'developer_id',
        allowNull: false,
      },
      as: 'developer',
      onDelete: 'cascade'
    });

    Message.belongsTo(model.Company, {
      foreignKey: {
        name: 'company_id',
        allowNull: false,
      },
      as: 'company',
      onDelete: 'cascade'
    });

  };

  return Message;
};
