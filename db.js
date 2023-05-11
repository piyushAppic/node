const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://piyush:piyush@cluster0.7ajvqnf.mongodb.net/?retryWrites=true&w=majority")

const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
})