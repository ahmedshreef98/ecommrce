const { Schema, model, Types } = require('mongoose')

const schema = Schema({
    name: {
        type: String,
        required: [true, 'Subcategory Name Required'],
        trim: true, // trim free spacing
        unique: [true, 'Subcategory Name Unique'],
        minlength: [2, 'Too Short Subcategory Name']
    },
    slug: {
        type: String,
        lowercase: true
    },
    category: { //-----ID-----
        type: Types.ObjectId,
        ref: 'category'
    }
}, { timestamps: true })

module.exports = model('subcategory', schema)