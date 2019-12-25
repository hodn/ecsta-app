const router = require('express').Router();
let Reflection = require('../models/reflection.model');

router.route('/add').post((req, res) => {
    const userId = req.body.userId;
    const weekId = req.body.weekId;
    const name = req.body.name;
    const note = req.body.note;
    const reflections = req.body.reflections;
    const unixStamp = req.body.unixStamp;
    
    const newReflection = new Reflection({
        userId,
        weekId,
        name,
        note,
        reflections,
        unixStamp
    });

    newReflection.save()
        .then(() => res.json('Reflection added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update').post((req, res) => {
    Reflection.findById(req.body.id)
        .then(ref => {
            ref.name = req.body.name;
            ref.note = req.body.note;
            ref.reflections = req.body.reflections;

            ref.save()
                .then(() => res.json('Reflection updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete').delete((req, res) => {
    Reflection.findByIdAndDelete(req.params.id)
        .then(() => res.json('Reflection deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;