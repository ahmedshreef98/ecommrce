const { createBrand, getBrands, getBrand, updateBrand, deleteBrand } = require('./brand.service')

const router = require('express').Router({ mergeParams: true }) // Merge Params (parent&child) into params of child

router.route('/')
    .post(createBrand)
    .get(getBrands)

router.route('/:id')
    .get(getBrand)
    .put(updateBrand)
    .delete(deleteBrand)

module.exports = router





