const UserModel = require("./user.model");
const slugify = require("slugify");
const AppError = require("../../utils/AppError");
const catchAsyncError = require("../../utils/catchAsyncErr");
const factory = require('../Handlers/handler.factory')

// to add new barnds
exports.createUser = catchAsyncError(async (req, res) => {
    let User = new UserModel(req.body);
    await User.save();
    res.status(200).json(User);
});

// to get all Users
exports.getUsers = catchAsyncError(async (req, res) => {
    let Users = await UserModel.find({});
    res.status(200).json(Users);
});

// to get specific User
exports.getUser = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let User = await UserModel.findById(id);
    !User && next(new AppError("User not found", 400));
    User && res.status(200).json(User);
});

// to update specific User
exports.updateUser = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let User = await UserModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    );

    !User && next(new AppError("User not found", 400));
    User && res.status(200).json(User);
});

// to delete specific User
exports.deleteUser = factory.deleteOne(UserModel)


