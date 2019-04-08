
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Messages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    message: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    status: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    senderId: {
      type: Sequelize.INTEGER,
      onDelete: 'cascade',
      references: {
        model: 'Contacts',
        key: 'id',
      },
    },
    receiverId: {
      type: Sequelize.INTEGER,
      onDelete: 'cascade',
      references: {
        model: 'Contacts',
        key: 'id',
      },
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Messages'),
};
