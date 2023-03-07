const Blog = require('./blog');
const User = require('./user');
const ReadingList = require('./reading_list');
const ReadingListUser = require('./reading_list_user');
const Session = require('./session')

User.hasMany(Blog);
Blog.belongsTo(User);

// Session.hasMany(User);
// User.belongsTo(Session);

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' });
Blog.belongsToMany(User, { through: ReadingList, as: 'readings' });
Blog.belongsToMany(ReadingList, { through: ReadingListUser, as: 'readinglists' })
ReadingList.belongsToMany(Blog, { through: ReadingListUser, as: 'readinglists' })
// Blog.belongsToMany(User, { through: ReadingList })
User.hasMany(ReadingList)
Blog.hasMany(ReadingList)
ReadingList.belongsTo(User)
ReadingList.belongsTo(Blog)

User.hasMany(Session)
Session.belongsTo(User)

module.exports = {
  Blog, User, ReadingList, ReadingListUser, Session
};