var mongoose = require('mongoose');
var bcrypt = require('bcrypt')
var SchemaTypes = mongoose.Schema.Types;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true},
    sex:{type: String, require: true},
    address:{type: String, require: true},
    email:{type:String,require: true},
    birthday:{type:Date,require:true},
    pass:{type:String,require:true},
    resetPasswordToken: String,
    resetPasswordExpires: Date
});


// Export model.
module.exports = mongoose.model('User', UserSchema);