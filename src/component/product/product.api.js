const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('./product.service')

const router = require('express').Router({ mergeParams: true }) // Merge Params (parent&child) into params of child

router.route('/')
    .post(createProduct)
    .get(getProducts)

router.route('/:id')
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct)

module.exports = router





