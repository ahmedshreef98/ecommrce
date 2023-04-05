const { Schema, model, Types } = require('mongoose')

const schema = Schema({
    title: {
        type: String,
        required: [true, 'Review Required'],
        trim: true, // trim free spacing
        minlength: [2, 'Too Short Brand Name']
    },
    user: {
        type: Types.ObjectId,
        ref: 'user'
    },
    product: {
        type: Types.ObjectId,
        ref: 'product'
    },
    rateAverage: {
        type: Number,
        required: [true, 'Review Required'],
        min: [1, 'Rating must be at least 1']
    }


}, { timestamps: true })

module.exports = model('review', schema)