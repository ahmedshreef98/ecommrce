const slugify = require("slugify");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const UserModel = require("./user.model");
const AppError = require("../../utils/AppError");
const catchAsyncError = require("../../utils/catchAsyncErr");

//Sign Up 
exports.signUp = catchAsyncError(async (req, res, next) => {
    let isUser = await UserModel.findOne({ email: req.body.email })
    if (isUser) return next(new AppError('Email Already Exists'))

    let User = new UserModel(req.body);
    await User.save();
    res.status(200).json(User);
});


//Sign In
exports.signIn = catchAsyncError(async (req, res, next) => {
    let user = await UserModel.findOne({ email: req.body.email })
    if (!user || !(await bcrypt.compare(req.body.password, user.password)))
        return next(new AppError('Email Or Password Incorrect', 405))


    let token = jwt.sign({ name: user.name, userId: user._id }, process.env.JWT_KEY)

    res.status(200).json({ token });
});


// Authentication Midleware Function
exports.ProtectRoutes = catchAsyncError(async (req, res, next) => {

    //Token Provide---
    let token = req.headers.token
    if (!token) return next(new AppError('Token Not provided'))

    //Token Verify---
    let decoded = await jwt.verify(token, process.env.JWT_KEY)
    // console.log(decoded);

    //Check Token userId Still exists in database 
    let user = await UserModel.findById(decoded.userId)
    if (!user) return next(new AppError('User Not Found'))

    //Token TimeOut!
    let changePassword = parseInt(user.changePasswordAt / 1000)
    if (changePassword > decoded.iat) return next(new AppError('Password Changed ', 401))

    req.user = user
    next()

})


// Authorization 
exports.allowedTo = (...roles) => {

    return catchAsyncError(async (req, res, next) => {
        if (!roles.includes(req.user.role))
            return next(new AppError('You are not Authorized to Access Thi Route', 401))

        next() // if req User Include The Role Needed
    })


}