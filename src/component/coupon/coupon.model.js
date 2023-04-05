const { Schema, model, Types } = require('mongoose')

const schema = Schema({
    code: {
        typeof: "string",
        required: [true, 'Coupon Required'],
        trim: true,
        unique: [true, 'couponCode Required'],
    },
    expries: {
        type: Date
    },
    discount: {
        type: Number
    }

}, { timestamps: true })

module.exports = model('coupon', schema)