const { Schema, model, Types } = require('mongoose')

const schema = Schema({
    name: {
        type: String,
        required: [true, 'Category Name Required'],
        trim: true, // trim free spacing
        unique: [true, 'Category Name Unique'],
        minlength: [2, 'Too Short Category Name']
    },
    slug: {
        type: String,
        lowercase: true
    },
    image: String

}, { timestamps: true })


//Return Full base url for category image
schema.post('init', (doc) => {
    doc.image = 'http://localhost:3000/category/' + doc.image
})

module.exports = model('category', schema)