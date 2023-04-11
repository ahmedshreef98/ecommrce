const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require('./category.service');
const subcategoryRoute = require('../subcategory/subcategory.api.js');
const { uploadSingleFile } = require('../../utils/fileUpload');

const router = require('express').Router();

router.route('/')
    .post(uploadSingleFile('image', 'category'), createCategory)
    .get(getCategories)

router.route('/:id')
    .get(getCategory)
    .put(uploadSingleFile('image', 'category'), updateCategory)
    .delete(deleteCategory)

router.use('/:categoryId/subcategories', subcategoryRoute)
//Merge Params 


module.exports = router