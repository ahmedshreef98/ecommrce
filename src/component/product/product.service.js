const slugify = require('slugify');
const AppError = require('../../utils/AppError');
const catchAsyncErr = require('../../utils/catchAsyncErr');
const ApiFeatures = require('../../utils/ApiFeatures');

const ProductModel = require('./product.model')

//-------------------------------------------------


//Adding new Product
exports.createProduct = catchAsyncErr(async (req, res) => {

    let imgs = []                                            // Array to store images
    req.body.slug = slugify(req.body.name)
    req.body.imageCover = req.files.imageCover[0].filename

    // Push  images' filename to Array(imgs) 
    req.files.images.forEach((elm) => {
        imgs.push(elm.filename)
    })
    req.body.images = imgs                                 // Assign to images
    let product = new ProductModel(req.body)
    await product.save()
    res.status(201).json(product) // status code between server and  browser
})


//Get All Products
exports.getProducts = catchAsyncErr(async (req, res, next) => {
    let apiFeatures = new ApiFeatures(ProductModel.find(), req.query)
        .paginate().fields().filter().search().sort()   //Chaining
    let pages = new ApiFeatures(ProductModel.find(), req.query)
    console.log(pages);

    let products = await apiFeatures.mongooseQuery    //Excute One time  -await when excute not on Building

    res.status(201).json({ page: apiFeatures.page, products })
    //nextpage: apiFeatures.page + 1
    // prevpage: apiFeatures.page - 1
    //totalPages: --------------------
})


//Get Specific Product
exports.getProduct = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params
    let product = await ProductModel.findById(id)

    !product && next(new AppError(`Prodct Not Found`, 400))
    product && res.status(201).json(product)
})



//Update Product
exports.updateProduct = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params
    if (req.body.name) {
        req.body.slug = slugify(req.body.name)
    }

    let imgs = []      // Array to store images
    req.body.imageCover = req.files.imageCover[0].filename
    // Push  images' filename to Array(imgs) 
    req.files.images.forEach((elm) => {
        imgs.push(elm.filename)
    })
    req.body.images = imgs
    let product = await ProductModel.findByIdAndUpdate(id, req.body, { new: true }) // to save the updated Product in "product"variable
    !product && next(new AppError(`Product Not Found`, 400))
    product && res.status(201).json(product)
})



//Delete Specific Product
exports.deleteProduct = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params
    let product = await ProductModel.findByIdAndDelete(id)

    !product && next(new AppError(`Product Not Found`, 400))
    product && res.status(201).json({ message: "Product Deleted" })
})

