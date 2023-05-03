const { createBrand, getBrands, getBrand, updateBrand, deleteBrand } = require('./brand.service')
const { uploadSingleFile } = require('../../utils/fileUpload')
const { ProtectRoutes, allowedTo } = require('../user/user.auth.js')

const router = require('express').Router({ mergeParams: true }) // Merge Params (parent&child) into params of child

router.route('/')
    .post(ProtectRoutes, allowedTo('admin'), uploadSingleFile('image', 'brand'), createBrand)
    .get(getBrands)

router.route('/:id')
    .get(getBrand)
    .put(ProtectRoutes, allowedTo('admin'), uploadSingleFile('image', 'brand'), updateBrand)
    .delete(ProtectRoutes, allowedTo('admin'), deleteBrand)

module.exports = router





