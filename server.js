const express = require("express")
const app = express()
const path = require('path')

require("./db")
const PORT = 3000

const CorsPermission = require("./middlewares/corsPermission")
app.use(CorsPermission);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// View Engine Setup
app.set('views', path.join(__dirname, 'payment/views'))
app.set('view engine', 'ejs')

const userRouter = require("./routers/userRouter")
app.use("/api/v1/user", userRouter)

app.use("*", (req, res)=> {
    res.send("Hello 404 page")
})

app.listen(PORT, () => {
    console.log(`server created successfully on port ${PORT}`)
})