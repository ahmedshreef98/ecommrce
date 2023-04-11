const slugify = require('slugify');
const fs = require('fs');

const AppError = require('../../utils/AppError');
const catchAsyncErr = require('../../utils/catchAsyncErr');
const factory = require('../Handlers/handler.factory');
const brandModel = require('./brand.model');
const BrandModel = require('./brand.model');
const { error } = require('console');

const cloudinary = require('cloudinary').v2;

// Configuration 
cloudinary.config({
    cloud_name: "dof4fim96",
    api_key: "922986542759866",
    api_secret: "A2AVwc_tO_Hd3-aaaFXweXpNRMY"
});

//-------------------------------------------------

//Adding new Brand
exports.createBrand = catchAsyncErr(async (req, res) => {

    // // Upload
    // cloudinary.uploader.upload(req.file.path, async (error, result) => {

    // })
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file?.filename
    const brand = new BrandModel(req.body)
    await brand.save()
    res.status(201).json(brand) // status code between server and  browser


})


//Get All Brands
exports.getBrands = catchAsyncErr(async (req, res, next) => {
    const brands = await BrandModel.find({})
    res.status(201).json(brands)
})

//Get Specific Brand
exports.getBrand = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params
    let brand = await BrandModel.findById(id)

    !brand && next(new AppError(`Brand Not Found`, 400))
    brand && res.status(201).json(brand)
})



//Update Brand
exports.updateBrand = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params
    if (req.body.name) req.body.slug = slugify(req.body.name)
    req.body.image = req.file?.filename       //fileName is Optional 


    let brand = await BrandModel.findByIdAndUpdate(id, req.body
        , { new: true })     // to save the updated Brand in "brand"variable

    !brand && next(new AppError(`Brand Not Found`, 400))
    brand && res.status(201).json(brand)
})



//Delete Specific Brand
let deletebrand = factory.deleteOne(brandModel)
exports.deleteBrand = catchAsyncErr(deletebrand)

