const {check,validationResult} = require("express-validator")
const express = require("express")
const router = express.Router()
const {db} = require('../db');
const {Show, User} = require("../models/index")


const app = express() 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Gets all users
router.route("/")
.get(async (req,res)=>{
    let users = await User.findAll()
    res.json(users)
})

//Get specific user with id
router.route("/:id")
.get(async (req,res)=>{
    let oneUser = await User.findByPk(req.params.id)
    res.json(oneUser)
})


//Puts shows watched in under specific user id
router.route("/:userId/shows/:showId")
.put(async (req,res)=>{

    let user = await User.findByPk(req.params.userId)
    let show = await Show.findByPk(req.params.showId)
    await user.addShows(show)
    await show.addUsers(user)
    const userShows = await user.getShows()
    const watchedShow = await show.getUsers()
    res.json(watchedShow)
})

//Gets all shows user has watched
router.route("/:userId/shows")
.get(async (req,res)=>{
    
    let watchedShows = await Show.findAll({
        where:{
            UserId: req.params.userId
        }
    })
    res.json(watchedShows)
})


module.exports = router;