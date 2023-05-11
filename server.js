const express = require("express")
const app = express()
require("./db")
const PORT = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./routers/userRouter")
app.use("/api/v1/user", userRouter)

app.use("*", (req, res)=> {
    res.send("Hello")
})

app.listen(PORT, () => {
    console.log(`server created successfully on port ${PORT}`)
})