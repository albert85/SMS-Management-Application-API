module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
  }, {});

  Contact.associate = (models) => {
    Contact.hasMany(models.Message, {
      foreignKey: 'senderId',
      as: 'senderMessages',
    });
    Contact.hasMany(models.Message, {
      foreignKey: 'receiverId',
      as: 'receiverMessages',
    });
  };

  return Contact;
};