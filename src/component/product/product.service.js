const slugify = require('slugify');
const AppError = require('../../utils/AppError');
const catchAsyncErr = require('../../utils/catchAsyncErr');
const ApiFeatures = require('../../utils/ApiFeatures');

const ProductModel = require('./product.model')

//-------------------------------------------------


//Adding new Product
exports.createProduct = catchAsyncErr(async (req, res) => {
    req.body.slug = slugify(req.body.name)
    let product = new ProductModel(req.body)
    await product.save()
    res.status(201).json(product) // status code between server and  browser
})


//Get All Products
exports.getProducts = catchAsyncErr(async (req, res, next) => {
    let apiFeatures = new ApiFeatures(ProductModel.find(), req.body)
        .paginate()
        .filter()
        .sort()
        .search()
        .fields()
    const products = await apiFeatures.mongooseQuery     //Excute One time
    res.status(201).json({ page: apiFeatures.page, products })
})


//Get Specific Product
let getproduct = async (req, res, next) => {
    const { id } = req.params
    let product = await ProductModel.findById(id)

    !product && next(new AppError(`Prodct Not Found`, 400))
    product && res.status(201).json(product)
}
exports.getProduct = catchAsyncErr(getproduct)



//Update Product
let updateproduct = async (req, res, next) => {
    const { id } = req.params
    if (req.body.name) {
        req.body.slug = slugify(req.body.name)

    }
    let product = await ProductModel.findByIdAndUpdate(id, req.body, { new: true }) // to save the updated Product in "product"variable

    !product && next(new AppError(`Product Not Found`, 400))
    product && res.status(201).json(product)
}
exports.updateProduct = catchAsyncErr(updateproduct)



//Delete Specific Product
let deleteproduct = async (req, res, next) => {
    const { id } = req.params
    let product = await ProductModel.findByIdAndDelete(id)

    !product && next(new AppError(`Product Not Found`, 400))
    product && res.status(201).json({ message: "Product Deleted" })
}
exports.deleteProduct = catchAsyncErr(deleteproduct)

