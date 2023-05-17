const express = require('express');
const router = express.Router();

const db = require("../database");

router.get("/all", async (req, res) => {

    let data = await db.findAll();

    return res.json(data);
});

router.post("/add", async (req, res) => {

    console.log(req.body);

    let name = await req.body.name;


    try { 
        console.log(await db.insert(name));

        res.sendStatus(200);

    } catch (error) {

        console.error(error)

        res.sendStatus(500);
    }
});

router.put("/edit", async (req, res) => {

    let _id = await req.body._id;
    let name = await req.body.name;

    console.log(_id, name)

    try {
        console.log(await db.update(_id, name));

        res.sendStatus(200);

    } catch (error) {

        console.error(error)

        res.sendStatus(500);
    }
});

router.delete("/remove", async (req, res) => {

    let _id = await req.body._id;
    let name = await req.body.name;

    console.log(_id, name)

    try {
        console.log(await db.deleteOne(_id));

        res.sendStatus(200);

    } catch (error) {

        console.error(error)

        res.sendStatus(500);
    }
});

module.exports = router;
