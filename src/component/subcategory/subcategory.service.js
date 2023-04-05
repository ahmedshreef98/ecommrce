const slugify = require('slugify');
const AppError = require('../../utils/AppError');
const SubCategoryModel = require('./subcategory.model')
const catchAsyncErr = require('../../utils/catchAsyncErr');

//-------------------------------------------------

//Adding new SubCategory
let create = async (req, res) => {
    const { name, category } = req.body
    const subcategory = new SubCategoryModel({ name, slug: slugify(name), category })
    await subcategory.save()
    res.status(201).json(subcategory) // status code between server and  browser
}
exports.createSubCategory = catchAsyncErr(create)


//Get All SubCategories
let getsubcategories = async (req, res, next) => {
    let filter = {}
    if (req.params.categoryId) {
        filter = { category: req.params.categoryId }
    }

    const subCategories = await SubCategoryModel.find(filter) //category --> property ID 
    res.status(201).json(subCategories)
}
exports.getSubCategories = catchAsyncErr(getsubcategories)

//Get Specific SubCategory
let getsubcategory = async (req, res, next) => {
    const { id } = req.params
    let subCategory = await SubCategoryModel.findById(id)
    if (!subCategory) {
        return next(new AppError(`Sub-Category not found`, 400))
    }
    res.status(201).json(subCategory)
}
exports.getSubCategory = catchAsyncErr(getsubcategory)



//Update SubCategory
let updatesubcategory = async (req, res, next) => {
    const { id } = req.params
    const { name, category } = req.body
    let subCategory = await SubCategoryModel.findByIdAndUpdate(id, { name, slug: slugify(name), category }
        , { new: true }) // to save the updated subcategory in "subCategory"variable
    if (!subCategory) {
        return next(new AppError(`Sub Category not found`, 400))
    } else {
        res.status(201).json(subCategory)
    }
}
exports.updateSubCategory = catchAsyncErr(updatesubcategory)



//Delete Specific SubCategory
let deletesubcategory = async (req, res, next) => {
    const { id } = req.params
    let subCategory = await SubCategoryModel.findByIdAndDelete(id)
    if (!subCategory) {
        return next(new AppError(`Sub Category not found`, 400))
        // res.status(404).json({ message: 'Category not found' })
    } else {
        res.status(201).json({ message: "Sub Category deleted" })
    }
}
exports.deleteSubCategory = catchAsyncErr(deletesubcategory)

