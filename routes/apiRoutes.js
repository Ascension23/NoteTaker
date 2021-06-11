const express = require("express")
const router = express.Router()
const db = require("../db/db.json")
const fs = require("fs")
const uniqid = require("uniqid")

router.get("/api/notes", (req, res) => {
    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) {
            console.err(err)
        };
        console.log(data, "This is from get")
        return res.json(JSON.parse(data))
    })
})

router.post("/api/notes", (req, res) => {
    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) {
            console.err(err)
        } else {
            const dbNotes = JSON.parse(data)
            console.log(dbNotes)
            const addNotes = {
                title: req.body.title,
                text: req.body.text,
                id: uniqid()
            } 
            dbNotes.push(addNotes)
            fs.writeFile("db/db.json", JSON.stringify(dbNotes), (err) => {
                if (err) throw err;
                res.json(dbNotes)
            })
        }
    })
})

router.delete("/api/notes/:id", (req, res) => {
    const noteID = req.params.id
    fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) {
        console.err(err)
    } else {
        const dbNotes = JSON.parse(data)
        for (let i = 0; i < dbNotes.length; i++) {
            if (noteID === dbNotes [i].id) {
                dbNotes.splice([i], 1)
                fs.writeFile("db/db.json", JSON.stringify(dbNotes), (err) => {
                    if (err) throw err;
                    res.json(dbNotes)
                })
            }
        }
    }
    })
})

module.exports = router;