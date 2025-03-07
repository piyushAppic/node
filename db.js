const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URI)

const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
})
