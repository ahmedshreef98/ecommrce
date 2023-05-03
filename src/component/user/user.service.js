const UserModel = require("./user.model");
const slugify = require("slugify");


const AppError = require("../../utils/AppError");
const catchAsyncError = require("../../utils/catchAsyncErr");
const factory = require('../Handlers/handler.factory')

// Adding new User 
exports.createUser = catchAsyncError(async (req, res, next) => {
    let isUser = await UserModel.findOne({ email: req.body.email })
    if (isUser) return next(new AppError('Email Already Exists'))
    let User = new UserModel(req.body);
    await User.save();
    res.status(200).json(User);
});

// Get ALL_USERS
exports.getUsers = catchAsyncError(async (req, res) => {
    let Users = await UserModel.find({});
    res.status(200).json(Users);
});

//Get Spesific User
exports.getUser = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let User = await UserModel.findById(id);
    !User && next(new AppError("User not found", 400));
    User && res.status(200).json(User);
});

//Update Specific User
exports.updateUser = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let User = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

    !User && next(new AppError("User not found", 400));
    User && res.status(200).json(User);
});

//Change Password--Admin Role
exports.changePassword = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    req.body.changePasswordAt = Date.now() //Save Time Password changed in it
    let User = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

    !User && next(new AppError("User not found", 400));
    User && res.status(200).json(User);
});

//Delete specific User
exports.deleteUser = factory.deleteOne(UserModel)


