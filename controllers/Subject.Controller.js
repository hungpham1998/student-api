const db = require('../config/db.config.js');
const Subject = db.subject;
const Chelude = db.chedule;
const Student = db.student;
const Semester = db.semester;
const { Op } = require("sequelize");
var moment = require('moment');
module.exports = {
    async store(req, res) {
        try {
            await Subject.create({
                Title: req.body.Title,
                CreaditNumber: req.body.CreaditNumber,
                Code: req.body.Code,
                Note: req.body.Note,
                semesterId: req.body.semesterId
            });
            await Subject.findAll({
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                      model: Semester
                   }]
            }).then(subject => {
                res.json({ subject })
            }).catch(err => {
                res.send({ status: 500, "Error -> ": err });
            })
            
        }
        catch (err) {
            res.status(500).send("Error -> " + err);
        }
    },

    async getAll(req, res) {
        try {
            let subject;
            if (req.body.page) {
                subject = await Subject.findAndCountAll({
                    offset: 15 * (req.body.page - 1),
                    limit: 15
                });
            }
            else {
                subject = await Subject.findAndCountAll();
            }
            return res.json({ subject: subject, status: 200, success: true });
            
        }
        catch (err) {
            res.send("Error -> " + err);
        }
    },
   
   async update(req, res) {
       try {
           const Id = req.params.id;
           await Subject.update(
               {
                   Title: req.body.Title,
                   CreaditNumber: req.body.CreaditNumber,
                   Note: req.body.Note,
                   Code: req.body.Code,
                   semesterId: req.body.semesterId
               },
               { returning: true, where: { Id: Id } }
           );
           await Subject.findAll({ order: [
               ['updatedAt', 'DESC'],
               
           ],
           include: [{
            model: Semester
         }]
           }).then((subject) => {
               return res.json({ subject });
           })
        }
        catch (err) {
            res.send({status: 500,  "error": err });
        }
    
    },
     
    async delete(req, res) {
        try {
            
            await Subject.destroy({ where: { Id: req.params.id } })
            return res.json({ message: "delete subject successfully!", status: 200 });
        }
        catch (err) {
          return  res.send({ error, status: 400 })
        }
    },

   async deleteAll(req, res) {
        try {
             await Subject.destroy({
                where: {},
                truncate: true
            })
            return res.send({  success: true,    stauts: 200,});
        }
        catch (err) {
           return  res.status(500).send("can not delete " + err);
        }

    },

    getById(req, res) {
        Subject.findAll({
            where: { Id: req.params.id },
            
            // include: [{
            //     model: Learnclass,
            //     include: [{
            //         model: Student,
            //         attributes: ['id','Last_Name', 'Note', 'Frist_Name','Address','Brithday'],   
            //     }, {
            //         model: Subject,
            //             attributes: ['id', 'Note', 'Title', 'Code'],
            //             include: [{ model: Learnyear, }]
            //         }, {
            //         model: Account,
            //         }, {
            //         model: Learnclass
            //     }],
            // }],
        }).then(Subject => {
            res.send(Subject);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })

    },

    async findByTitle(req, res) {
        let data;
        const title = req.query.Title; 
        try {
            if (title.length === 0 || title === '' || title === null) {
            
                data = await Subject.findAndCountAll({})
            }
            else {
                data = await Subject.findAndCountAll({
                    where: {
                        Title: {
                            $like: title
                        }
                    },
                    include: [{
                        model: Semester,
                    }]
                })
            }
              return   res.json({ Subject: data });
        }
        catch(err) {
            res.status(500).send("Error -> " + err);
        }
    },

    getByChedule(req, res) {
        Subject.findAll({
            where: { Id: req.params.id },
            include: [{
                model: Chelude,
            }],
        }).then(Subject => {
            res.send(Subject);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })

    },


};
