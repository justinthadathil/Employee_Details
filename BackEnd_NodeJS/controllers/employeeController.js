const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {Employee} = require('../models/Employee');

// localhost:3000/Employee || all emp
router.get('/', (req, res) => {
    Employee.find((err,docs)=>{
        if(!err)
        {res.send(docs);}
        else{
            console.log('error in retriving emp'+ JSON.stringify(err, undefined,2));
        }
    });
});

// localhost:3000/Employee || for specific Emp
router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record was given ID : ${req.params.id}`);

    Employee.findById(req.params.id, (err,docs) => {
        if(!err)
        {res.send(docs);}
        else{
            console.log('error in retriving emp'+ JSON.stringify(err, undefined,2));
        }
    });
});

// localhost:3000/Employee
router.post('/', (req, res) => {
    var emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    });
    emp.save((err,docs)=>{
        if(!err)
        {res.send(docs);}
        else{
            console.log('error in sending emp'+ JSON.stringify(err, undefined,2));
        }
    });
});


//   || update
router.put('/:id',(req,res) =>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record was given ID : ${req.params.id}`);

    var emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
        };
        Employee.findByIdAndUpdate(req.params.id, { $set: emp }, {new: true}, (err,docs)=>{
            if(!err)
            {res.send(docs);}
            else{
                console.log('error in updating emp'+ JSON.stringify(err, undefined,2));
            }
        });
});


// || delete
router.delete('/:id',(req,res) =>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record was given ID : ${req.params.id}`);

    Employee.findByIdAndRemove(req.params.id, (err,docs)=>{
        if(!err)
        {res.send(docs);}
        else{
            console.log('error in deleting emp'+ JSON.stringify(err, undefined,2));
        }
    });
});

module.exports = router;