module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [["failed", "sent"]],
          msg: "Must be either pending or sent",
        }
      }
    },
  }, {});

  Message.associate = (models) => {
    Message.belongsTo(models.Contact, {
      foreignKey: 'senderId',
      onDelete: 'CASCADE',
    });
    Message.belongsTo(models.Contact, {
      foreignKey: 'receiverId',
      onDelete: 'CASCADE',
    });
  };

  return Message;
};
