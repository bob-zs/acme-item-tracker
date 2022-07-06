const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/the_acme_item_tracker_db');

const { STRING, INTEGER } = Sequelize;

const User = conn.define('user', {
  name: {
    type: STRING 
  }
});

const Thing = conn.define('thing', {
  name: {
    type: STRING
  },
  rank: {
    type: INTEGER,
    defaultValue: 1,
  }
});

User.hasMany(Thing);
Thing.belongsTo(User);

module.exports = {
  conn,
  User,
  Thing
};
