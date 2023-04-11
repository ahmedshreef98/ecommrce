const slugify = require('slugify');

const AppError = require('../../utils/AppError');
const catchAsyncErr = require('../../utils/catchAsyncErr');

const CategoryModel = require('./category.model')
//-------------------------------------------------

//Adding new Category
exports.createCategory = catchAsyncErr(async (req, res) => {
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file?.filename     //fileName is Optional 
    console.log(req.body);
    const category = new CategoryModel(req.body)
    await category.save()
    res.status(201).json(category) // status code between server and  browser
})


//Get All Categories
exports.getCategories = catchAsyncErr(async (req, res) => {
    const categories = await CategoryModel.find({})
    res.status(201).json(categories)
})

//Get Specific Category
exports.getCategory = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params
    let category = await CategoryModel.findById(id)
    if (!category) {
        return next(new AppError(`Category not found`, 400))
    }
    res.status(201).json(category)
}
)



//Update Category
exports.updateCategory = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params
    if (req.body.name) req.body.slug = slugify(req.body.name)

    req.body.image = req.file?.filename
    let category = await CategoryModel.findByIdAndUpdate(id, req.body
        , { new: true }) // to save the updated category in "category"variable
    if (!category) {
        return next(new AppError(`Category not found`, 400))
    } else {
        res.status(201).json(category)
    }
})



//Delete Specific Category
exports.deleteCategory = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params
    let category = await CategoryModel.findByIdAndDelete(id)
    if (!category) {
        return next(new AppError(`Category not found`, 400))
        // res.status(404).json({ message: 'Category not found' })
    } else {
        res.status(201).json({ message: "Category deleted" })
    }
})

