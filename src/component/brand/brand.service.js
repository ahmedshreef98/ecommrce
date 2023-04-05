const slugify = require('slugify');
const AppError = require('../../utils/AppError');
const catchAsyncErr = require('../../utils/catchAsyncErr');

const factory = require('../Handlers/handler.factory');
const brandModel = require('./brand.model');
const BrandModel = require('./brand.model')

//-------------------------------------------------

//Adding new Brand
let createbrand = async (req, res) => {
    const { name } = req.body
    const brand = new BrandModel({ name, slug: slugify(name) })
    await brand.save()
    res.status(201).json(brand) // status code between server and  browser
}
exports.createBrand = catchAsyncErr(createbrand)


//Get All Brands
let getbrands = async (req, res, next) => {
    const brands = await BrandModel.find({})
    res.status(201).json(brands)
}
exports.getBrands = catchAsyncErr(getbrands)

//Get Specific Brand
let getbrand = async (req, res, next) => {
    const { id } = req.params
    let brand = await BrandModel.findById(id)

    !brand && next(new AppError(`Brand Not Found`, 400))
    brand && res.status(201).json(brand)
}
exports.getBrand = catchAsyncErr(getbrand)



//Update Brand
let updatebrand = async (req, res, next) => {
    const { id } = req.params
    const { name } = req.body
    let brand = await BrandModel.findByIdAndUpdate(id, { name, slug: slugify(name) }
        , { new: true }) // to save the updated Brand in "brand"variable

    !brand && next(new AppError(`Brand Not Found`, 400))
    brand && res.status(201).json(brand)
}
exports.updateBrand = catchAsyncErr(updatebrand)



//Delete Specific Brand
let deletebrand = factory.deleteOne(brandModel)
exports.deleteBrand = catchAsyncErr(deletebrand)

