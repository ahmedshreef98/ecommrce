
const slugify = require('slugify');
const AppError = require('../../utils/AppError');
const catchAsyncErr = require('../../utils/catchAsyncErr');



exports.deleteOne = (Model) => {
    return catchAsyncErrorasync = async (req, res, next) => {
        const { id } = req.params
        let document = await Model.findByIdAndDelete(id)

        !document && next(new AppError(`Document Not Found`, 400))
        document && res.status(201).json({ MSG: "DELETED", result: document })
    }
}

