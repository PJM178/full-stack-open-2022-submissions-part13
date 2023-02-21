const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../util/db');

class UserBlogs extends Model {}

UserBlogs.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'blogusers',
});

module.exports = UserBlogs;