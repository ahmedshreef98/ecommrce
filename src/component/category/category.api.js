const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require('./category.service');
const subcategoryRoute = require('../subcategory/subcategory.api.js');
const { uploadSingleFile } = require('../../utils/fileUpload');
const { ProtectRoutes, allowedTo } = require('../user/user.auth');

const router = require('express').Router();

router.route('/')
    .post(ProtectRoutes, allowedTo('admin'), uploadSingleFile('image', 'category'), createCategory)
    .get(getCategories)

router.route('/:id')
    .get(getCategory)
    .put(ProtectRoutes, allowedTo('admin'), uploadSingleFile('image', 'category'), updateCategory)
    .delete(ProtectRoutes, allowedTo('admin'), deleteCategory)

router.use('/:categoryId/subcategories', subcategoryRoute)
//Merge Params 


module.exports = router