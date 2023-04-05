
const slugify = require('slugify');
const AppError = require('../../utils/AppError');
const catchAsyncErr = require('../../utils/catchAsyncErr');


//  let deletebrand = async (req, res, next) => {
//     const { id } = req.params
//     let brand = await BrandModel.findByIdAndDelete(id)

//     !brand && next(new AppError(`Brand Not Found`, 400))
//     brand && res.status(201).json(brand)
// }
// exports.deleteBrand = catchAsyncErr(deletebrand)

exports.deleteOne = (Model) => {
    return catchAsyncErrorasync = async (req, res, next) => {
        const { id } = req.params
        let document = await Model.findByIdAndDelete(id)

        !document && next(new AppError(`Document Not Found`, 400))
        document && res.status(201).json({ result: document })
    }
}

