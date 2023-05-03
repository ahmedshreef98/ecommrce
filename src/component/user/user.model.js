const { Schema, model, Types } = require('mongoose')
const bcrypt = require('bcrypt')
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
    changePasswordAt: { Date },
    phone: {
        type: String,
        required: [true, 'Phone Required'],
    },
    profileImage: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'user'],  //enum select value
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

//Mongoose Hooks
schema.pre('save', async function () {
    // This Refer to Schema DATA !@
    this.password = await bcrypt.hash(this.password, Number(process.env.ROUND))
})
//---------------------------
schema.pre('findOneAndUpdate', async function () {
    // This Refer to  Global  DATA !@
    this._update.password = await bcrypt.hash(this._update.password, Number(process.env.ROUND))
})

module.exports = model('user', schema)