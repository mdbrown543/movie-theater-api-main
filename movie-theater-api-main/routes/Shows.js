const {check,validationResult} = require("express-validator")
const express = require("express")
const router = express.Router()
const {db} = require('../db');
const {Show, User} = require("../models/index")

const app = express() 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Gets all shows
router.route("/")
.get(async (req,res)=>{
    let allShows = await Show.findAll()
    res.json(allShows)
})

//Update a rating on a specific show
router.route("/:id/:newRating/watched")
.put([check("rating").not().isEmpty().trim()], async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    }
    let id = req.params.id
    let newShow = await Show.findByPk(id)
    newShow.rating = req.body({
       
    })

    res.json(newShow)
})

//Checks status of show is between 5 and 25 characters and is not empty
//Updates status of show at id & displays specific show
router.route("/:id/:newStatus")
.put([check("status").not().isEmpty().trim(),check("status").isLength({ min: 5, max:25 })],async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    }
    let id = req.params.id
    let newShow = await Show.findByPk(id)
    newShow.status = req.params.newStatus

    res.json(newShow)
})

//Gets all shows with specific genre
router.route("/genres/:genre")
.get(async (req,res)=>{
    let genreGroup = await Show.findAll({
        where: {
            genre: req.params.genre
        }
    })
    res.json(genreGroup)
})

//Gets show with specific id or deletes show with that id
router.route("/:id")
.get(async (req,res)=>{
    let oneShow = await Show.findByPk(req.params.id)
    res.json(oneShow)
})
.delete(async (req,res)=>{
    await Show.destroy({
		where : {id : req.params.id}	
	});
    res.json("A show was removed!")
})


 
module.exports = router;