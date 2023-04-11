const multer = require('multer');
const AppError = require('./AppError');

let options = (folderName) => {
    const storage = multer.diskStorage({
        //where storage images
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`)
        },
        //Rename images Uploaded with unique name
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix + '-' + file.originalname)
        }
    })

    //Filter Files Upload Images Only
    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true)
        } else { cb(new AppError("Images Only", 400), false) }
    }

    const upload = multer({ storage, fileFilter })
    return upload
}

//------------------------Single File----------------------------------------
exports.uploadSingleFile = (fileName, folderName) => options(folderName).single(fileName)

// ------------------------------Mix Files----------------------------------
exports.uploadMixOfFiles = (arrayOfFields, folderName) => options(folderName).fields(arrayOfFields)

