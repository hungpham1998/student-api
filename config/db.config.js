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


db.account.belongsTo(db.department, {
  foreignKey: "Department_Id",
  as: "department",
});
db.account.belongsTo(db.position);
// db.account.belongsToMany(db.role, { as:'account', through: 'accountrole', foreignKey: 'AccoutId', otherKey: 'RoleId' });
// db.account.belongsToMany(db.subject, { as: 'teachers', through: 'chedule', foreignKey: 'AccountId', otherKey: 'SubjectId' });
// db.account.belongsToMany(db.subject, { as: 'rooms', through: 'chedule', foreignKey: 'AccountId', otherKey: 'ClassId' });
db.department.hasMany(db.account);
db.learnclass.belongsTo(db.specailized);
// db.learnclass.belongsToMany(db.subject, {as:'bookrooms', through: 'chedule', otherKey: 'SubjectId', foreignKey: 'ClassId' });
// db.learnclass.belongsToMany(db.student, { as: 'class', through: 'chedule', foreignKey: 'ClassId', otherKey: 'StudentId' });
db.learnyear.hasMany(db.pointpractice);
db.pointpractice.belongsTo(db.student);
db.pointpractice.belongsTo(db.learnyear);
db.pointstudent.belongsTo(db.subject);
db.position.hasMany(db.account);

// db.student.belongsToMany(db.learnclass, { as: 'students',through: 'chedule', foreignKey: 'StudentId', otherKey: 'ClassId' });
// db.student.belongsToMany(db.subject, { as: 'subjects', through: 'chedule', otherKey: 'SubjectId', foreignKey: 'StudentId' });
// db.subject.belongsToMany(db.student, { as: 'subjects', through: 'chedule', otherKey: 'StudentId', foreignKey: 'SubjectId' });
// db.subject.belongsToMany(db.account, { as:'subjects',through: 'chedule', foreignKey: 'SubjectId', otherKey: 'AccountId' });
// db.subject.belongsToMany(db.learnclass, { as: 'chedule',through: 'chedule', otherKey: 'ClassId', foreignKey: 'SubjectId' });
db.subject.belongsTo(db.learnyear);
db.subject.hasMany(db.pointstudent);




module.exports = db;
