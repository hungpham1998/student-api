const db = require('../config/db.config.js');
const Student = db.student;
const Learnchedule = db.learnchedule;
const Subject = db.subject;
const Account = db.account;
const Learnclass = db.learnclass;
const Pointstudent = db.pointstudent;
const Role = db.role;
const { Op } = require("sequelize");
var moment = require('moment')
module.exports = {
    async getAll(req, res) {
        try {
            let role;
            if (req.body.page) {
                role = await Role.findAll({
                    offset: 15 * (req.body.page - 1),
                    limit: 15
                });
            }
            else {
                role = await Role.findAll({
                    order: [
                        ['createdAt', 'DESC'],
                    ],
                });
            }
            return res.json({ role });
            
        }
        catch (err) {
            res.send("Error -> " + err);
        }
    },
   
}
