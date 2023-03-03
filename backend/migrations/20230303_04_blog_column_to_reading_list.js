const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('reading_list_users', 'blog_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'blogs', key: 'id' }
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('reading_list_users', 'blog_id');
  },
};