const { createBrand, getBrands, getBrand, updateBrand, deleteBrand } = require('./brand.service')
const { uploadSingleFile } = require('../../utils/fileUpload')
const router = require('express').Router({ mergeParams: true }) // Merge Params (parent&child) into params of child

router.route('/')
    .post(uploadSingleFile('image', 'brand'), createBrand)
    .get(getBrands)

router.route('/:id')
    .get(getBrand)
    .put(uploadSingleFile('image', 'brand'), updateBrand)
    .delete(deleteBrand)

module.exports = router





