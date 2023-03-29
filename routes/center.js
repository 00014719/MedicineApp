const express = require("express")
const medicineRoute = express.Router();
const fs = require('fs');
const dataPath = './data/medicines_data.json' // path to our JSON file


// Function to write newly added medicine into json file
const saveMedicines = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}

// Function to fetch all data from json file
const getMedicinesData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)   
}

medicineRoute.get('/', (req, res) => {
    res.render('pages/index')
})
// Read - get all medicines from the json file
medicineRoute.get('/medicines', (req, res) => {
    const medicinesData = getMedicinesData()
    // res.send(medicinesData)
    res.render('pages/medicines', {
        data: medicinesData
    })
})

// Read only one medicine with given id in URL parameters
medicineRoute.get('/medicine/:id', (req, res) => {
    const existignMedicines = getMedicinesData()
    givenId = parseInt(req.params['id'])

    for (let i=0; i<existignMedicines.length; i++) {
        if (existignMedicines[i].id === givenId) {
            res.render('partials/detail', {
                medicine: existignMedicines[i]
            })
        }
    }
})


medicineRoute.get('/new', (_, res) => {
    res.render('partials/new_med')
})

// Create a new medicine using Post method and save it to json file
medicineRoute.post('/new', (req, res) => {
    const existignMedicines = getMedicinesData()
    const newMedicineId = Math.floor(100000 + Math.random() * 900000)

    const newMed = {}
    
    newMed.id = newMedicineId
    newMed.title = req.body.title
    newMed.atx_code = req.body.atx_code
    newMed.producer = req.body.producer
    newMed.dosage_form = req.body.dosage_form
    newMed.in_stock = req.body.in_stock
    newMed.produced_data = req.body.produced_data

    existignMedicines.push(newMed)

    saveMedicines(existignMedicines);
    res.redirect('/medicines')
})


medicineRoute.get('/medicine/update/:id', (req, res) => {
    const existignMedicines = getMedicinesData()
    const givenId = req.params['id']
    for (let i=0; i<existignMedicines.length; i++) {
        if (existignMedicines[i].id == givenId) {
            res.render('partials/update_med', {
                medicine: existignMedicines[i]
            })
        }
    }
})

// Update - using Put method
medicineRoute.post('/medicine/update/:id', (req, res) => {
    const existignMedicines = getMedicinesData()
    const givenId = req.params['id']

    for (let i=0; i<existignMedicines.length; i++) {
        if (existignMedicines[i].id == givenId) {
            console.log(req.body)
            existignMedicines[i].title = req.body.title
            existignMedicines[i].atx_code = req.body.atx_code
            existignMedicines[i].producer = req.body.producer
            existignMedicines[i].dosage_form = req.body.dosage_form
            existignMedicines[i].in_stock = req.body.in_stock
            existignMedicines[i].produced_data = req.body.produced_data

            saveMedicines(existignMedicines)
        }

    }
    res.redirect('/medicines')
});

// delete - using post method
medicineRoute.post('/medicine/delete/:id', (req, res) => {
    let existignMedicines = getMedicinesData()

    existignMedicines = existignMedicines.filter(item => item['id'] != req.params['id'])
    saveMedicines(existignMedicines)
    res.redirect('/')

  })


module.exports = medicineRoute
