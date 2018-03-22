const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

        
        
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/Hefc';
const PORT = process.env.PORT || 8080;

mongoose.connect(DB_URL);
const connection = mongoose.connection;
connection.on("open", ()=> {
    console.log('we connected to mongoose');
});

// bring in member model
const Member = require('./models/Member');

// bring in login model
const Login = require('./models/Login');

app.use (cors());

// these come from npmjs.org - body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// GET /members -> get members from db, send them back to client
app.get('/members', (req,res)=>{
    // read member from db, send them back using res.json
    // READ MEMBER FROM DB
    // 1. take the model, call .find()
    let mysort ={firstname: 1};
    Member.find({}).sort(mysort)
    .then(members =>{
        console.log(members);
        res.json(members);
    })
    .catch(error=>{
        console.log(error);
    })
});

// POST /members -> create a new member
app.post('/members', (req,res)=>{
    // take data from the POST request body
    let memberData = req.body;
    // use model to create instance
    const newMember = Member({
        firstname: memberData.firstname,
        lastname: memberData.lastname,
        address: memberData.address,
        phone: memberData.phone,
        mobile: memberData.mobile,
        email: memberData.email
        });
    // call .save() on the instance
    newMember.save()
        .then(savedMember =>{
            console.log(savedMember);
            res.json(savedMember);
            })
        .catch(error =>{
            console.log(error);
            })
    })

// UPDATE -> update data for existing member
app.put('/members/:memberId', (req, res)=> {
    // get memberId from req.params.memberId
    console.log('hit endpoint')
    console.log(req.body)
    let idToUpdate = req.params.memberId
    // get update data from req.body
    let updateData = req.body;

    Member.findOneAndUpdate({_id: idToUpdate},
                           updateData, {new:true})
        .then(updated => {
            res.json(updated);
        })
        .catch(error => {
            res.status(500).json(error);
        });
    });

// DELETE
app.delete('/members', (req, res)=>{
    console.log(req.body);
    let idToRemove = req.body._id;
    Member.findByIdAndRemove(idToRemove)
        .then(removed =>{
            res.send(result);
        })
        .catch(error =>{
            res.send(error);
        })
    })

 // LOGIN
 app.post('/login', (req,res) => {
    let password = req.body.password;
    Login.find({password:password})
    .then(login =>{
        console.log(login);
        res.json(login);
    })
    .catch(error=>{
        console.log(error);
    })


})

// REGISTER
app.post('/register', (req,res) => {
    let password = req.body.password;
    let designation = req.body.designation;
    const newLogin = Login({
        password: password,
        designation: designation
        });
    // call .save() on the instance
    newLogin.save()
        .then(savedLogin =>{
            console.log(savedLogin);
            res.json(savedLogin);
            })
        .catch(error =>{
            console.log(error);
            })
    })




app.listen(PORT, ()=> {
    console.log("server started on", PORT);
})