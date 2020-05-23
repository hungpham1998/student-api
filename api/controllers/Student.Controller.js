
const  db =require('../config/db.config');
const Student = db.Student;
const Class = db.Class;
module.exports ={
    // create: (req, res) => {
    //     var Student;
    //     Student.create({
    //         firs_tname: req.body.firstname,
    //         last_name: req.body.lastname,
    //         Image: req.body.Image,
    //         address: req.body.address,
    //         brithday: req.body.brithday,
    //        // Id_Class: 
    //     },
    //         {
    //             include: [Class]
    //         }).then((err, res) => {
    //             if (err) throw err;
    //             res.send("create a Student Done !");
    //             res.send(Student);
    //         })
    // },

    getAll: (req, res) => {
        Student.findAll({
            // attributes: [['Id','Id_Class'], 'first_name', 'last_name', 'Image','address','brithday'],
            // include: [{
            //     model: Class,
            //     where: { Id: db.Sequelize.col('Student.Id_Class') },
            //     attributes: ['Title']
            // }]
        }).then((err, student) => {
            if (err) throw err;
           res.send(student);
        });
    }
};
