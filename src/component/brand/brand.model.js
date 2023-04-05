const { Schema, model, Types } = require('mongoose')

const schema = Schema({
    name: {
        type: String,
        required: [true, 'Brand Name Required'],
        trim: true, // trim free spacing
        unique: [true, 'Brand Name Unique'],
        minlength: [2, 'Too Short Brand Name']
    },
    slug: {
        type: String,
        lowercase: true
    },
    image: String
}, { timestamps: true })

module.exports = model('brand', schema)