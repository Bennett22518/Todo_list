const { default: mongoose } = require("mongoose");
const schema = mongoose.Schema;

const formSchema = new schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},{
    timestamps : true
})

const User = mongoose.model('User',formSchema);

const taskSchema = new mongoose.Schema({
    // email:{ type: String, required: true},
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
  const Task = mongoose.model('Task', taskSchema);

module.exports = {Task, User};

