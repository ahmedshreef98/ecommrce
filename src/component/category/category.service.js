const slugify = require('slugify');

const AppError = require('../../utils/AppError');
const catchAsyncErr = require('../../utils/catchAsyncErr');

const CategoryModel = require('./category.model')
//-------------------------------------------------

//Adding new Category
let create = async (req, res) => {
    const { name } = req.body
    const category = new CategoryModel({ name, slug: slugify(name) })
    await category.save()
    res.status(201).json(category) // status code between server and  browser
}
exports.createCategory = catchAsyncErr(create)


//Get All Categories
let getcategories = async (req, res) => {
    const categories = await CategoryModel.find({})
    res.status(201).json(categories)
}
exports.getCategories = catchAsyncErr(getcategories)

//Get Specific Category
let getcategory = async (req, res, next) => {
    const { id } = req.params
    let category = await CategoryModel.findById(id)
    if (!category) {
        return next(new AppError(`Category not found`, 400))
    }
    res.status(201).json(category)
}
exports.getCategory = catchAsyncErr(getcategory)



//Update Category
let updatecategory = async (req, res, next) => {
    const { id } = req.params
    const { name } = req.body
    let category = await CategoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }
        , { new: true }) // to save the updated category in "category"variable
    if (!category) {
        return next(new AppError(`Category not found`, 400))
    } else {
        res.status(201).json(category)
    }
}
exports.updateCategory = catchAsyncErr(updatecategory)



//Delete Specific Category
let deletecategory = async (req, res, next) => {
    const { id } = req.params
    let category = await CategoryModel.findByIdAndDelete(id)
    if (!category) {
        return next(new AppError(`Category not found`, 400))
        // res.status(404).json({ message: 'Category not found' })
    } else {
        res.status(201).json({ message: "Category deleted" })
    }
}
exports.deleteCategory = catchAsyncErr(deletecategory)

