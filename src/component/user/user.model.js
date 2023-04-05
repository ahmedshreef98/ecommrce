const { Schema, model, Types } = require('mongoose')

const schema = Schema({
    name: {
        type: String,
        required: [true, 'User Name Required'],
        trim: true, // trim free spacing
        minlength: [2, 'Too Short Brand Name']
    },
    email: {
        type: String,
        required: [true, 'Email Required'],
        trim: true,
        unique: [true, 'Email Must Be Unique'],
    },
    password: {
        type: String,
        required: [true, 'Password Required'],
        min: [5, 'Password length must be greater than 6 digits']
    },
    phone: {
        type: String,
        required: [true, 'Phone Required'],
    },
    profileImage: {
        type: String
    },
    role: {
        type: Stirng,
        enum: ['admin', 'user']  //enum select value from we spiecfed them  
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

module.exports = model('user', schema)