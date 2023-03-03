const Blog = require('./blog');
const User = require('./user');
const ReadingList = require('./reading_list');
const ReadingListUser = require('./reading_list_user');


User.hasMany(Blog);
Blog.belongsTo(User);

ReadingList.belongsToMany(User, { through: ReadingListUser })
ReadingList.belongsToMany(Blog, { through: ReadingListUser })
User.belongsToMany(ReadingList, { through: ReadingListUser })
Blog.belongsToMany(User, { through: ReadingListUser })
User.belongsToMany(Blog, { through: ReadingListUser, as: 'readings' })

module.exports = {
  Blog, User, ReadingList, ReadingListUser
};