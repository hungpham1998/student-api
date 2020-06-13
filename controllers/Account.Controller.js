const db = require('../config/db.config');
const config = require('../config/config.js');
const account = db.account;
const role = db.role;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
module.exports = {

    signup(req, res){
        account.create({
            Account: req.body.Account,
            UserName: req.body.UserName,
            Mail: req.body.Mail,
            PassWord: bcrypt.hashSync(req.body.PassWord, 8),
        }).then(user => {
            role.findAll({
            where: {
                Title: {
                [Op.or]: req.body.roles 
                }
            }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.send("User registered successfully!");
                });
            }).catch(err => {
                res.status(500).send("Error -> " + err);
            });
        }).catch(err => {
            res.status(500).send("Fail! Error -> " + err);
        })
    },

    signin(req, res){
	
        account.findOne({
            where: {
                UserName: req.body.UserName
            }
        }).then(user => {
            if (!user) {
                return res.status(404).send('User Not Found.');
            }

            var passwordIsValid = bcrypt.compareSync(req.body.PassWord, account.PassWord);
            if (!passwordIsValid) {
                return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
            }
            
            var token = jwt.sign({ id: account.Id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            
            res.status(200).send({ auth: true, user, accessToken: token });
            
        }).catch(err => {
            res.status(500).send('Error -> ' + err);
        });
    },

    userContent(req, res){
        account.findOne({
            where: {id: req.accountId},
            attributes: ['Account', 'UserName', 'Mail'],
            include: [{
                model: role,
                attributes: ['id', 'Title'],
                through: {
                    attributes: ['accountId', 'roleId'],
                }
            }]
        }).then(user => {
            res.status(200).json({
                "description": "User Content Page",
                "user": user
            });
        }).catch(err => {
            res.status(500).json({
                "description": "Can not access User Page",
                "error": err
            });
        })
    },

    adminBoard(req, res){
        account.findOne({
            where: {id: req.Account_Id},
            attributes: ['Account', 'UserName', 'Mail'],
            include: [{
                model: role,
                attributes: ['id', 'Title'],
                through: {
                    attributes: ['Account_Id', 'Role_Id'],
                }
            }]
        }).then(user => {
            res.status(200).json({
                "description": "Admin Board",
                "user": user
            });
        }).catch(err => {
            res.status(500).json({
                "description": "Can not access Admin Board",
                "error": err
            });
        })
    },

    managementBoard(req, res){
        account.findOne({
            where: {id: req.Account_Id},
            attributes: ['Account', 'UserName', 'Mail'],
            include: [{
                model: role,
                attributes: ['id', 'Title'],
                through: {
                    attributes: ['Account_Id', 'Role_Id'],
                }
            }]
        }).then(user => {
            res.status(200).json({
                "description": "Management Board",
                "user": user
            });
        }).catch(err => {
            res.status(500).json({
                "description": "Can not access Management Board",
                "error": err
            });
        })
    },

    async update(req, res) {
        const id = req.pramas.id;
       await account.update(
            {
                Account: req.body.Account,
                UserName: req.body.UserName,
                Mail: req.body.Mail,
                PassWord: bcrypt.hashSync(req.body.PassWord, 8),
                Image: req.body.Image,
                Note: req.body.Note,
            },
            { returning: true, where: { id:id } }
        ).then(account => {
            role.findAll({
            where: {
                Title: {
                [Op.or]: req.body.roles 
                }
            }
            }).then(roles => {
                account.setRoles(roles).then(() => {
                    res.send("account update successfully!");
                });
            }).catch(err => {
                res.status(500).send("Error -> " + err);
            });
        }).catch(err => {
            res.status(500).send("Fail! Error -> " + err);
        })  
    },

  async  getById(req, res) {
        const id = req.params.id;
       await account.findOne({
            where: {Id: id},
            attributes: ['Account', 'UserName', 'Mail','Image','Note'],
            include: [{
                model: role,
                attributes: ['Id', 'Title'],
                through: {
                    attributes: ['acountId', 'roleId'],
                }
            }]
        }).then(account => {
            res.status(200).json({
                "description": "account",
                "account": account
            });
        }).catch(err => {
            res.status(500).json({
                "description": "Can not access",
                "error": err
            });
        })
    },
 
    async getAll(req, res) {
        await account.findAll({
            include: [{
                model: role,
                through: {
                    attributes: ['accountId', 'roleId'],
                }
            }]
        }).then(account => {
            res.status(200).json({
                "description": "account",
                "account": account
            });
        }).catch(err => {
            res.status(500).json({
                "description": "Can not access",
                "error": err
            });
        })
    },
    
    async delete(req, res) {
        const Id = req.params.id;
        try {
             await Account.destroy({
                where: {id: Id },
                truncate: true
            })
            return res.send({  success: true,    stauts: 200,});
        }
        catch (err) {
           return  res.status(500).send("can not delete " + err);
        }

    },


    async store(req, res) {
          await  account.create({
                Account: req.body.Account,
                UserName: req.body.UserName,
                Mail: req.body.Mail,
                PassWord: bcrypt.hashSync(req.body.PassWord, 8),
                departmentId: req.body.departmentId,
                positionId: req.body.positionId
            }).then(user => {
                role.findAll({
                    where: {
                        Title: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send("User registered successfully!");
                    });
                }).catch(err => {
                    res.status(500).send("Error -> " + err);
                });
            }).catch(err => {
                res.status(500).send("Fail! Error -> " + err);
            })
    }

};
