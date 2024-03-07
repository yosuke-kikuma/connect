const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
        username: {
            type: String,
            min: 3,
            max: 25,
            required: true,  
            trim: true,
            unique: true, 
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            min: 6,
            max: 50,
            required: true,
            trim: true,
        },
        profilePicture: {
            type: String,
            default: "",
        },
        coverPicture: {
            type: String,
            default: "",
        },
        followers: {
            type: Array,
            default: [],
        },
        followings: {
            type: Array,
            default: [],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        desc: {
            type: String,
            max: 70,
        },
        city: {
            type: String,
            max: 50,
        },
    },
        { timestamps: true }  
    );

module.exports = mongoose.model('User', UserSchema);
