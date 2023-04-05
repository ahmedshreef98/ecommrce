const mongoose = require('mongoose')

module.exports.dbConnection = () => {
    mongoose.connect(process.env.CONNECTION_STRING)
        .then(() => {
            console.log("DB CONNECTION ESTABLISHED");
        })
        .catch((err) => {
            console.log(err);
        })
}
