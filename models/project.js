// instead of import we use require
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: String,
  description: String
});

const Project = mongoose.model('Project', projectSchema);

// same as "export default"
module.exports = Project;