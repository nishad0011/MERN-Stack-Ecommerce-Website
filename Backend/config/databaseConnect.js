const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(
        process.env.DB_URI
    ).then((data) => {
        console.log(`Mongo Db connected to server: ${data.connection.host}`);
    })
}

module.exports = connectDatabase