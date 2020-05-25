'use strict';

const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.student = require('../models/student.js')(sequelize, Sequelize);
db.learnclass = require('../models/learnclass.js')(sequelize, Sequelize);
db.account = require('../models/account.js')(sequelize, Sequelize);
db.department = require('../models/department')(sequelize, Sequelize);
db.position = require('../models/position')(sequelize, Sequelize);
db.role = require('../models/role')(sequelize, Sequelize);
db.subject = require('../models/subject')(sequelize, Sequelize);
db.specailize = require('../models/specailize')(sequelize, Sequelize);
db.learnyear = require('../models/learnyear')(sequelize, Sequelize);
db.learnchedule = require('../models/learnchedule')(sequelize, Sequelize);
db.pointstudent = require('../models/pointstudent')(sequelize, Sequelize);
db.pointpractice = require('../models/pointpractice')(sequelize, Sequelize);


module.exports = db;
