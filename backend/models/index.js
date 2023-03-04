const Blog = require('./blog');
const User = require('./user');
const ReadingList = require('./reading_list');
const ReadingListUser = require('./reading_list_user');

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' });
Blog.belongsToMany(ReadingList, { through: ReadingListUser, as: 'readinglists' })
// Blog.belongsToMany(User, { through: ReadingList })
User.hasMany(ReadingList)
Blog.hasMany(ReadingList)
ReadingList.belongsTo(User)
ReadingList.belongsTo(Blog)


module.exports = {
  Blog, User, ReadingList, ReadingListUser
};