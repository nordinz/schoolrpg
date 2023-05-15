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

    console.log('Formulär - http://localhost:3000/listings-and-reviews/add' + name);
    
    try { // Testa följande kod
        console.log(await db.insert(name));

        res.sendStatus(200); // Returnera 200 (OK) vid lyckad insert

    } catch (error) { // Fånga upp fel

        console.error(error)

        res.sendStatus(500); // Returnera 500 (server error) vid fel
    }
});

router.put("/edit", async (req, res) => {

    let _id = await req.body._id;
    let name = await req.body.name;

    console.log(_id, name)
    
    try { // Testa följande kod
        console.log(await db.update(_id, name));

        res.sendStatus(200); // Returnera 200 (OK) vid lyckad insert

    } catch (error) { // Fånga upp fel

        console.error(error)

        res.sendStatus(500); // Returnera 500 (server error) vid fel
    }
});

router.delete("/remove", async (req, res) => {

    let _id = await req.body._id;
    let name = await req.body.name;

    console.log(_id, name)
    
    try { // Testa följande kod
        console.log(await db.deleteOne(_id));

        res.sendStatus(200); // Returnera 200 (OK) vid lyckad insert

    } catch (error) { // Fånga upp fel

        console.error(error)

        res.sendStatus(500); // Returnera 500 (server error) vid fel
    }
});

module.exports = router;