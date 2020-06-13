const db = require('../config/db.config.js');
const LearnYear = db.learnyear;

const { Op } = require("sequelize");
var moment = require('moment')
module.exports = {
    async store(req, res) {
        try {
            await LearnYear.create({
                Title: req.body.Title,
                Note: req.body.Note
            }).then(LearnYear => {
                res.json({ LearnYear})
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
            let learnYear;
            if (req.body.page) {
                learnYear = await LearnYear.findAndCountAll({
                    offset: 15 * (req.body.page - 1),
                    limit: 15
                });
            }
            else {
                learnYear = await LearnYear.findAndCountAll({});
            }
            return res.json({ learnYear, status: 200, success: true });
            
        }
        catch (err) {
            res.send("Error -> " + err);
        }
    },
   
   async update(req, res) {
       try {
           const Id = req.params.id;
           await LearnYear.update(
               {
                   Title: req.body.Title,
                   Note: req.body.Note
               },
               { returning: true, where: { Id: Id } }
           );
           await LearnYear.findAll({
            order: [
                ['updatedAt', 'DESC'],
            ],
           }).then((learnyear) => {
            return res.json({ learnyear} );
           }) 
        }
        catch (err) {
            res.send({status: 500, "can not update " : LearnYear, "error": err });
        }
    
    },
     
    async delete(req, res) {
        try {
            
            await LearnYear.destroy({ where: { Id: req.params.id } })
            return res.json({ message: "delete LearnYear successfully!", status: 200 });
        }
        catch (err) {
          return  res.send({ error, status: 400 })
        }
    },

   async deleteAll(req, res) {
        try {
             await LearnYear.destroy({
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
        LearnYear.findOne({
            where: { Id: req.params.id }
        }).then(LearnYear => {
            res.send(LearnYear);
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        })

    },
    async findByTitle(req, res) {
        let data;
        try {
            const title = req.query.Title; 
            if (title.length === 0 || title === '' || title === null) {
            
                    data = await LearnYear.findAndCountAll({})
            }
            else {
                data = await LearnYear.findAndCountAll({
                    where: {
                        Title: {
                            $like: title
                        }
                    }
                })
            }
            return   res.json({ Learnyear: data});
            
        }
        catch(err) {
            res.status(500).send("Error -> " + err);
        }
    },

};
