const db = require('../config/db.config.js');
const Student = db.student;
const Learnchedule = db.learnchedule;
const Subject = db.subject;
const Account = db.account;
const Learnclass = db.learnclass;
const Pointstudent = db.pointstudent;
const Department = db.department;
const Position = db.position;
const Specailize = db.specailize;
const { Op } = require("sequelize");
// const sqs = require('sequelize-querystring')
var moment = require('moment')
module.exports = {
    async store(req, res) {
        try {
            await Learnclass.create({
                Title: req.body.Title,
                Note: req.body.Note,
                Specailize_Id: req.body.SpecailizeId
            }).then(Learnclass => {
                res.json({ Learnclass, status: 200 })
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
            let learnclass;
            if (req.body.page) {
                learnclass = await Learnclass.findAll({
                    offset: 15 * (req.body.page - 1),
                    limit: 15
                });
            }
            else {
                learnclass = await Learnclass.findAll();
            }
            return res.json({ Learnclass: learnclass, status: 200, success: true });
            
        }
        catch (err) {
            res.send("Error -> " + err);
        }
    },
   
   async update(req, res) {
       try {
           const Id = req.params.id;
          await Learnclass.update(
                {
                    Title: req.body.Title,
                  Note: req.body.Note,
                  Specailize_Id: req.body.SpecailizeId
                },
                { returning: true, where: { id: Id } }
            )
            return res.json({ Learnclass, staust: 200, "updated successfully a Learnclass with id = ": Id } ); 
        }
        catch (err) {
            res.send({status: 500, "can not update " : Learnclass, "error": err });
        }
    
    },
     
    async delete(req, res) {
        try {
            
            await Learnclass.destroy({ where: { id: req.params.id } })
            return res.json({ message: "delete Learnclass successfully!", status: 200 });
        }
        catch (err) {
          return  res.send({ error, status: 400 })
        }
    },

   async deleteAll(req, res) {
        try {
             await Learnclass.destroy({
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
        Learnclass.findOne({
            where: { id: req.params.id }
        }).then(Learnclass => {
            res.send(Learnclass);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })

    },


//    async getByTitle(req, res) {
//         const title = req.params.Title;
//       await  Learnclass.findAndCountAll({
//             where: 
//                 {Title: {$like : title}},
//         }).then(Learnclass => {
//             //  Learnclass.rows = Learnclass.rows.map((o) => { return o.get() })
//             res.send(Learnclass);
//         }).catch(err => {
//             res.status(500).send("Error -> " + err);
//         })
       
//    let data =  await Learnclass.findAndCountAll().then(Learnclass => {
//         res.send(Learnclass);
//     }).catch(err => {
//         res.status(500).send("Error -> " + err);
//     })
   // }
};
