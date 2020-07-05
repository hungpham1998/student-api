const db = require('../config/db.config');
const config = require('../config/config.js');
const account = db.account;
const role = db.role;
const Department = db.department;
const position = db.position;
const fs = require('fs');
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
            res.send(user)
        }).catch(err => {
            res.status(500).send("Fail! Error -> " + err);
        })
    },

  async signin(req, res){
	
        await account.findOne({
            where: {
                Account: req.body.Account
            },
        }).then(user => {
            if (!user) {
                return res.status(404).send('User Not Found.');
            }

            var passwordIsValid = bcrypt.compareSync(req.body.PassWord, user.PassWord);
            console.log(passwordIsValid)
            if (!passwordIsValid) {
                return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
            }
            let authorities = [];
            let User = {};
            user.getRoles().then(roles => {
              for (let i = 0; i < roles.length; i++) {
                authorities.push(roles[i].Title);
                }
                User = {
                    Id: user.Id,
                    UserName: user.UserName,
                    Account: user.Account,
                    Mail: user.Mail,
                    roles: authorities,
                    Image: '/uploads/'+user.Image,
                    Address: user.Address
                }
                var token = jwt.sign({ user: User }, config.secret, {
                    expiresIn: 86400 
                });
              res.status(200).send({ auth: true, accessToken: token });
            })
            
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
                attributes: ['Id', 'Title'],
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
        const id = req.params.id;
        console.log(id)
       let oldAccount=  await account.findOne({
            where: { Id: id }, returning: true,
       });
        console.log(oldAccount)
       await account.update(
            {
                Account: req.body.Account,
                UserName: req.body.UserName,
                Mail: req.body.Mail,
                PassWord: req.body.PassWord!== undefined ||req.body.PassWord!== null  ? bcrypt.hashSync(req.body.PassWord, 8): oldAccount.PassWord ,
                Image: req.body.Image,
                Note: req.body.Note,
            },
            {  where: { Id: id },returning: true, }
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
            res.json({ status: 200})
        }).catch(err => {
            res.status(500).send("Fail! Error -> " + err);
        })  
    },

  async  getById(req, res) {
        const id = req.params.id;
       await account.findAll({
            where: {Id: id},
            include: [{
                model: role,
                through: {
                    attributes: ['accountId', 'roleId'],
                }
            }]
       }).then(Account => {
           let account = [];

           Account.forEach((item) =>
               account.push({
                   ...item,
                   ...item.Image = '/uploads/'+ item.Image
           }))

           console.log(Account)
            res.status(200).json({ Account});
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
            },{
                model: Department,
            },{
                model: position,
            }]
        }).then(account => {
            res.json({ account });
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
             await account.destroy({
                where: {Id: Id },
                 include: [{
                     model: role,
                     through: {
                        where: { accountId: { [Op.or]: Id }, roleId:{ [Op.or]: role.Id || db.sequelize.col("Id") } },
                        attributes: ['accountId', 'roleId'],
                    }
                },{ 
                    model: Department,
                },{
                    model: position,
                }]
            })
            return res.send({  success: true,    stauts: 200,});
        }
        catch (err) {
           return  res.status(500).send("can not delete " + err);
        }

    },


    async store(req, res) {
        // fs.writeFileSync('/uploads/',req.body.Image);		
        // let imageData = fs.readFileSync('/uploads/' + req.body.Image);
        try {
            const user = await account.create({
                Account: req.body.Account,
                UserName: req.body.UserName,
                Mail: req.body.Mail,
                PassWord: bcrypt.hashSync(req.body.PassWord, 8),
                departmentId: req.body.departmentId,
                positionId: req.body.positionId,
                Address: req.body.Address,
                Image: req.file.filename
                
            })
            const roles = role.findAll({
                where: {
                    Title: req.body.Role.length > 0 ? req.body.Role : null
                }
            })
            
            await user.setRoles(roles).then(() => {
                account.findAll({
                    include: [{
                        model: role,
                        through: {
                            attributes: ['accountId', 'roleId'],
                        }
                    }, {
                        model: Department,
                    }, {
                        model: position,
                    }]
                }).then((user) => {
                    res.send({ user })
                })
            });
        }
        catch (err) {
                res.status(500).send("Fail! Error -> " + err);
        }
    }

};
