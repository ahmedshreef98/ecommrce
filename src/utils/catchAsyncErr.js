
//Error Handler Middleware Function
catchAsyncError = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(error => {
            next(error);
        })
    }
}

module.exports = catchAsyncError