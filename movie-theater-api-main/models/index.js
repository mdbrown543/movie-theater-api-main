const { Show } = require('./Show')
const { User } = require('./User')

//one-to-many relationship
Show.belongsTo(User)
User.hasMany(Show)


//many-to-many relationship
User.belongsToMany(Show,{through: "movie_watchlist"});
Show.belongsToMany(User,{through: "movie_watchlist"});

module.exports = {Show, User}
