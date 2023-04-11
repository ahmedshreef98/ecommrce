const { Schema, model, Types } = require('mongoose')

const schema = Schema({
    name: {
        type: String,
        required: [true, 'Product Name Required'],
        trim: true, // trim free spacing
        unique: [true, 'Product Name Unique'],
        minlength: [3, 'Too Short Product Name']
    },
    slug: {
        type: String,
        lowercase: true
    },
    description: {
        type: String,
        required: [true, 'Product Desc Required'],
        trim: true, // trim free spacing
        minlength: [10, 'Too Short Product Name']

    },
    images: [String],
    imageCover: String,
    quantity: {
        type: Number,
        default: 0,
        required: [true, 'Product Quantity Required']
    },
    colors: [String],
    price: {
        type: Number,
        required: [true, 'Product Price Required']

    },
    priceAfterDiscount: {
        type: Number,
        required: [true, 'Product Price After Discount Required']

    },
    sold: {
        type: Number,
        default: 0,
        required: [true, 'Product Sold  Discount Required']
    },
    ratingAverage: {
        type: Number,
        min: [1, 'RatingAverage Must be greater than 1'],
        max: [5, 'RatingAverage Must be less than 5'],

    },
    ratingCount: {
        type: Number,
        default: 0
    },

    category: {
        type: Types.ObjectId,
        ref: 'category',
        required: [true, 'Product Category Required']

    },
    subcategory: {
        type: Types.ObjectId,
        ref: 'subcategory',
        required: [true, 'Product SubCategory Required']

    },
    brand: {
        type: Types.ObjectId,
        ref: 'brand',
        required: [true, 'Product Brand Required']

    },



}, { timestamps: true }) //timestamps --> used for adding creating at 

//Return Full Url for products' images
schema.post('init', (doc) => {
    let imgs = []
    doc.imageCover = 'http://localhost:3000/product/' + doc.imageCover
    doc.images.forEach((elm) => {
        imgs.push('http://localhost:3000/product/' + elm)
    })
    doc.images = imgs
})

module.exports = model('product', schema)