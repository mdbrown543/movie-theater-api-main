const express = require("express");
const { append } = require("express/lib/response")
const { db } = require("./db")
const seed = require("./seed")
const app = express()
const {User} = require("./models/User")
const {Show} = require("./models/Show")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = 3000

const usersRouter = require("./routes/Users")
const showsRouter = require("./routes/Shows")
app.use("/Users", usersRouter)
app.use("/Shows", showsRouter)

app.get("/", async (req,res) => {
    const all = await User.findAll()
    const all1 = await Show.findAll()
    res.json(all,all1)
  
})

app.listen(port,async ()=>{
    await seed()
    console.log("Your server is listening on port" + port)
})