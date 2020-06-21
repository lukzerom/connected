const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const {
    check,
    validationResult
} = require('express-validator');
const User = require('../models/User')
const Car = require('../models/Car')


// @route GET api/cars
// @desc Get all user cars
// @access Private

router.get('/', auth, async (req, res) => {


    try {
        const cars = await Car.find({
            user: req.user.id
        }).sort({
            date: -1
        });

        res.json(cars)

    } catch (err) {

        res.status(500).send("Server error")
    }
});



// @route POST api/cars
// @desc Add car
// @access Private

router.post('/', [
    auth,
    [
        check('brand', 'Please enter brand of this car').not().isEmpty(),
        check('model', 'Please enter model of this car').not().isEmpty(),
        check('registration', 'Please add registration of this car').not().isEmpty(),

    ],
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const {
        brand,
        model,
        registration,
        plugins
    } = req.body;

    try {

        let carRegistrtion = await Car.findOne({
            registration
        })

        if (carRegistrtion) {
            return res.status(400).json({
                msg: 'Car is already registred'
            })
        }



        const newCar = new Car({
            brand,
            model,
            registration,
            plugins,
            user: req.user.id
        })


        const car = await newCar.save();
        res.json(car)
    } catch (err) {

        console.error(err.message)
        res.status(500).send("Server error ")

    }

});


// @route PUT api/cars/:id
// @desc Edit car details
// @access Private

router.put('/:id', auth, async (req, res) => {

    const {
        brand,
        model,
        registration,
        plugins
    } = req.body;


    const carFields = {}

    if (brand) carFields.brand = brand;
    if (model) carFields.model = model;
    if (registration) carFields.registration = registration;
    if (plugins) carFields.plugins = plugins;

    try {

        let car = await Car.findById(req.params.id)

        if (!car) {
            return res.status(404).json({
                msg: "Car not found"
            })
        }

        //Make sure user owns car

        if (car.user.toString() !== req.user.id) {
            return res.status(401).json({
                msg: "Not authorized"
            })
        }

        car = await Car.findByIdAndUpdate(req.params.id, {
            $set: carFields
        }, {
            new: true
        });
        res.json(car)

    } catch (err) {

        console.error(err.message)
        res.status(500).send("Server error ")
    }
});


// @route DELETE api/cars/:id
// @desc Delete car
// @access Private

router.delete('/:id', auth, async (req, res) => {


    try {

        let car = await Car.findById(req.params.id)

        if (!car) {
            return res.status(404).json({
                msg: "Car not found"
            })
        }

        //Make sure user owns contacts

        if (car.user.toString() !== req.user.id) {
            return res.status(401).json({
                msg: "Not authorized"
            })
        }
        await Car.findByIdAndRemove(req.params.id)

        res.json({
            msg: "Car removed"
        })

    } catch (err) {

        console.error(err.message)
        res.status(500).send("Server error ")
    }
});


// @route GET api/cars/:id
// @desc Get one car for reservation reasons
// @access Private

router.get('/:id', auth, async (req, res) => {


    try {

        let oneCar = await Car.findById(req.params.id)

        if (!oneCar) {
            return res.status(404).json({
                msg: "Car not found"
            })
        }


        res.json({
            oneCar
        })

    } catch (err) {

        console.error(err.message)
        res.status(500).send("Server error ")
    }
});




module.exports = router;