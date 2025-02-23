const mongoose=require('mongoose');
const { Schema }=mongoose;

const subSchema1=new Schema({
    P_id: {
        type: String,
        required: true,
        unique: true
    }
}) // for problems
const UserSchema=new Schema({
    Username: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    DOB: {
        type: Date,
    },
    Address: {
        type: String,
    },
    Title: {
        type: Number,
        default: 0
    },
    Questions_solved: [String],
    Questions_Created: [String],
    Correct_submissions: {
        type: Number,
        default: 0
    },
    Wrong_submissions: {
        type: Number,
        default: 0
    },
    Admin: {
        type: Boolean,
        default: 0
    }
});

module.exports=mongoose.model('User',UserSchema);