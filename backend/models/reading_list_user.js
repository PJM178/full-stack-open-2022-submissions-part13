const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../util/db');

class ReadingListUser extends Model {}

ReadingListUser.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  reading_list_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'reading_list', key: 'id' },
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'reading_list_user',
});

module.exports = ReadingListUser;