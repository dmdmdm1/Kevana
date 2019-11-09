var express = require('express');
var router = express.Router();

let Task = require('../models/task')

// GET api/tasks
router.get('/', function (req, res, next) {

  Task.find().populate('project').then((response) => {
    res.json(response)
  })
});

// POST /api/tasks
router.post('/', (req, res, next) => {

  // { project_id : '1i263516253gd5', title: 'Clean the room' }

  Task.create({
    project: req.body.project_id,
    title: req.body.title
  }).then(response => {
    res.json(response)
  })
});

module.exports = router;
