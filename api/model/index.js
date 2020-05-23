// const Sequelize = require('sequelize');
// const sequelize = require('../config/db.config');
// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;
// db.Student = require('./Student.Model')(sequelize, Sequelize);
// db.Class = require('./Class.Model')(sequelize, Sequelize);
// db.Account = require('./Account.Model')(sequelize, Sequelize);
// db.Department = require('./Department.Model')(sequelize, Sequelize);
// db.Position = require('./Position.Model')(sequelize, Sequelize);
// db.Role = require('./Role.Model')(sequelize, Sequelize);
// db.Subject = require('./Subject.Model')(sequelize, Sequelize);
// db.Specailize = require('./Specailize.Model')(sequelize, Sequelize);
// db.LearnYear = require('./LearnYear.Model')(sequelize, Sequelize);
// db.LearnChedule = require('./LearnChedule.Model')(sequelize, Sequelize);
// db.PointStudent = require('./PointStudent.Model')(sequelize, Sequelize);
// db.PointPracice = require('./PointPractise.Model')(sequelize, Sequelize);

// // một lớp nhiều học sinh
// db.Class.hasMany(db.Student, {foreignKey: 'Id_Class', targetKey: 'Id'});
// db.Student.belongsTo(db.Class, { foreignKey: 'Id_Class', targetKey: 'Id'});

// // một phòng ban nhiều tài khoản 
// db.Department.hasMany(db.Account, {foreignKey: 'Id_Department', targetKey: 'Id'});
// db.Account.belongsTo(db.Department, { foreignKey: 'Id_Department', targetKey: 'Id'});

// // một chức vụ nhiều tài khoản
// db.Position.hasMany(db.Account, { foreignKey: 'Id_Position', targetKey: 'Id' });
// db.Account.belongsTo(db.Position, { foreignKey: 'Id_Position', targetKey: 'Id' });

// // 1 quyền cho nhiều tài khoản, 1 tài khoản có nhiều quyền  
// db.Role.belongsToMany(db.Account, { through: 'account_role', foreignKey: 'Id_Role', otherKey: 'Id_Accout'});
// db.Account.belongsToMany(db.Role, { through: 'account_role', foreignKey: 'Id_Accout', otherKey: 'Id_Role' });

// // 1 lớp học sinh có nhiều môn học và 1 môn học có nhiều học sinh
// db.Subject.belongToMany(db.Student, {through:'LearnChedule', foreignKey: 'Id_Student', otherKey: 'Id_Subject' });
// db.Student.belongToMany(db.Subject, { through: 'LearnChedule', foreignKey: 'Id_Subject', otherKey: 'Id_Student' });

// // 1 giáo viên dạy nhiều môn, 1 môn nhiều giáo viên
// db.Account.belongsToMany(db.Subject, { through:'LearnChedule',foreignKey: 'Id_AccountAccount', otherKey: 'Id_Subject' });
// db.Subject.belongToMony(db.Account, { through: 'LearnChedule', foreignKey: 'Id_Subject', otherKey: 'Id_AccountAccount' });

// // 1 lớp có nhiều môn học , nhiều lớp học 1 môn học 
// db.Subject.belongToMany(db.Class, {through:'LearnChedule', foreignKey: 'Id_Class', otherKey: 'Id_Subject' });
// db.Class.belongToMany(db.Subject, { through: 'LearnChedule', foreignKey: 'Id_Subject', otherKey: 'Id_Class' });

// // 1 môn học có 1 bảng điểm, 1 bảng điểm 1 môn học
// db.Subject.belongsTo(db.PointStudent, {foreignKey: 'Id_Subject', targetKey: 'Id'});
// db.PointStudent.hasOne(db.Subject, {foreignKey: 'Id_Subject', targetKey: 'Id'});

// // 1 năm có nhiều môn học
// db.LearnYear.hasMany(db.Subject, { foreignKey: 'Id_Year', targetKey: 'Id' });
// db.Subject.belongsTo(db.LearnYear, { foreignKey: 'Id_Year', targetKey: 'Id' });

// // 1 năm có nhièu phiếu đánh giá, 
// db.LearnYear.hasMany(db.PointPracice, { foreignKey: 'Id_Year', targetKey: 'Id' });
// db.PointPracice.belongsTo(db.LearnYear, { foreignKey: 'Id_Year', targetKey: 'Id' });

// // 1 học sinh có nhiều phiếu đánh giá, 1 phiếu đánh giá cho 1 học sinh
// db.Student.hasMany(db.PointPracice, { foreignKey: 'Id_Student', targetKey: 'Id' });
// db.PointPracice.belongsTo(db.Student, { foreignKey: 'Id_Student', targetKey: 'Id' });

// module.exports = db;
