const Blog = require('./blog');
const User = require('./user');
const ReadingList = require('./reading_list');
const ReadingListUser = require('./reading_list_user');


User.hasMany(Blog);
Blog.belongsTo(User);

ReadingList.belongsToMany(User, { through: ReadingListUser })
User.belongsToMany(ReadingList, { through: ReadingListUser })

module.exports = {
  Blog, User, ReadingList, ReadingListUser
};