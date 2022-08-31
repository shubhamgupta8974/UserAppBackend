require ('./connection.js');
const users = require('./user.model.js');
const express = require('express')
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require('cors');
const app = express()
const port = 3000
app.use(cors())
app.use(bodyParser.json());
app.use('/',router);
/*app.get('/', (req, res) => res.send('Hello World!'))*/
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
/*get all the user details*/
router.route('/users').get((req, res) => {
    users.find((err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});
/*delete user by id*/
router.route('/user/delete/:id').get((req, res) => {
 var id = req.params.id;
 users.findOne({ID:id}, (err, users) => {
        if (err){
            res.json(err);
        }
        else
         users.remove(function(err){
          res.json('Removed successfully');
         });
            
    });
});
/* Update user by ID*/
router.route('/users/update/:id').post((req, res) => {
    var id = req.params.id;
    console.log(id, req.body);
    users.findOne({ID:id}, (err, user) => {
        if (err){
            res.json(err);
        }
        else {
            user.ID = req.body.ID;
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.address = req.body.address;
            user.phoneNumber = req.body.phoneNumber;
            user.save().then(user => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});
// /*View User by id*/
router.route('/user/view/:id').get((req, res) => {
 var id = req.params.id;
 console.log("id => ",id)
 users.findOne({ID:id}, (err, user) => {
        if (err){
            res.json(err);
        }
        else
         console.log(id);
         res.json(user);
            
    });
});
/* add User*/
router.route('/user/add').post((req, res) => {
    var user = new users(req.body);
    console.log(user);
    user.save()
        .then(user => {
            res.status(200).json({'User': user});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});