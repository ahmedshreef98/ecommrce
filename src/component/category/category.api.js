const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require('./category.service');
const subcategoryRoute = require('../subcategory/subcategory.api.js')

const router = require('express').Router();


// router.post('/categories', createCategory)
// router.get('/categorues', getCategories)
// router.get('/categories/:id', getCategory)

// Avoid Repeating Routes using --->router.route
router.route('/')
    .post(createCategory)
    .get(getCategories)

router.route('/:id')
    .get(getCategory)
    .put(updateCategory)
    .delete(deleteCategory)

router.use('/:categoryId/subcategories', subcategoryRoute)
//Merge Params 


module.exports = router