const { uploadMixOfFiles } = require('../../utils/fileUpload')
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('./product.service')
const { ProtectRoutes, allowedTo } = require('../user/user.auth.js')

const router = require('express').Router({ mergeParams: true }) // Merge Params (parent&child) into params of child

let fields = [{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 3 }]
router.route('/')
    .post(ProtectRoutes, allowedTo('admin'), uploadMixOfFiles(fields, 'product'), createProduct)
    .get(getProducts)

router.route('/:id')
    .get(getProduct)
    .put(ProtectRoutes, allowedTo('admin'), uploadMixOfFiles(fields, 'product'), updateProduct)
    .delete(ProtectRoutes, allowedTo('admin'), deleteProduct)

module.exports = router





