const db = require('../config/db.config');
const config = require('../config/config.js');
const account = db.account;
const role = db.role;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
exports.module = {

    signup(req, res){
        account.create({
            Account: req.body.Account,
            UserName: req.body.UserName,
            Mail: req.body.Mail,
            PassWord: bcrypt.hashSync(req.body.PassWord, 8)
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
            
            var token = jwt.sign({ id: account.id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            
            res.status(200).send({ auth: true, accessToken: token });
            
        }).catch(err => {
            res.status(500).send('Error -> ' + err);
        });
    },

    userContent(req, res){
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

    update(req, res) {
        const id = req.pramas.id;
        account.update(
            {
                Account: req.body.Account,
                UserName: req.body.UserName,
                Mail: req.body.Mail,
                PassWord: bcrypt.hashSync(req.body.PassWord, 8),
                Image: req.body.Image,
                Note: req.body.Note,
            },
            { returning: true, where: { id: req.params.id } }
        ).then(user => {
            role.findAll({
            where: {
                Title: {
                [Op.or]: req.body.roles 
                }
            }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.send("account update successfully!");
                });
            }).catch(err => {
                res.status(500).send("Error -> " + err);
            });
        }).catch(err => {
            res.status(500).send("Fail! Error -> " + err);
        })  
    },

    getById(req, res) {
        const id = req.params.id;
        account.findById({
            where: {id: req.params.id},
            attributes: ['Account', 'UserName', 'Mail','Image','Note'],
            include: [{
                model: role,
                attributes: ['id', 'Title'],
                through: {
                    attributes: ['Account_Id', 'Role_Id'],
                }
            }]
        }).then(user => {
            res.status(200).json({
                "description": "account",
                "user": user
            });
        }).catch(err => {
            res.status(500).json({
                "description": "Can not access",
                "error": err
            });
        })
    }
};
