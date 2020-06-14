'use strict';

const env = require('./env.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect|| 'mysql',
  freezeTableName: true,
  operatorsAliases: {
    $and: Op.and,
    $or: Op.or,
    $eq: Op.eq,
    $gt: Op.gt,
    $lt: Op.lt,
    $lte: Op.lte,
    $like: Op.like
  },
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
db.specailized = require('../models/specailized')(sequelize, Sequelize);
db.learnyear = require('../models/learnyear')(sequelize, Sequelize);
db.chedule = require('../models/chedule')(sequelize, Sequelize);
db.pointstudent = require('../models/pointstudent')(sequelize, Sequelize);
db.pointpractice = require('../models/pointpractice')(sequelize, Sequelize);
db.accountrole = require('../models/accountrole')(sequelize,Sequelize);
// sequelize.sync()


db.account.belongsTo(db.department);
db.account.belongsTo(db.position);
db.department.hasMany(db.account);
db.learnclass.belongsTo(db.specailized);
db.specailized.hasMany(db.learnclass);
db.learnyear.hasMany(db.pointpractice);
db.pointstudent.belongsTo(db.learnyear);
db.pointpractice.belongsTo(db.student);
db.subject.hasMany(db.pointstudent); 
db.pointstudent.belongsTo(db.subject);
db.learnclass.hasMany(db.chedule);
db.chedule.belongsTo(db.learnclass);
db.student.hasMany(db.chedule);
db.chedule.belongsTo(db.student)
db.account.hasMany(db.chedule);
db.chedule.belongsTo(db.account)
db.subject.hasMany(db.chedule);
db.chedule.belongsTo(db.subject);
db.learnclass.hasMany(db.student);
db.student.belongsTo(db.learnclass);
db.student.hasMany(db.pointstudent);
db.pointstudent.belongsTo(db.student);




module.exports = db;
