const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../util/db');

class ReadingListUser extends Model {}

ReadingListUser.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  readingListId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'reading_lists', key: 'id' },
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'blogs', key: 'id' },
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'reading_list_user',
});

module.exports = ReadingListUser;