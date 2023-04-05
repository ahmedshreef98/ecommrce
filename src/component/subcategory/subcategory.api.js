const { createSubCategory, getSubCategories, getSubCategory, updateSubCategory, deleteSubCategory } = require('./subcategory.service')

const router = require('express').Router({ mergeParams: true }) // Merge Params (parent&child) into params of child

router.route('/')
    .post(createSubCategory)
    .get(getSubCategories)

router.route('/:id')
    .get(getSubCategory)
    .put(updateSubCategory)
    .delete(deleteSubCategory)

module.exports = router





