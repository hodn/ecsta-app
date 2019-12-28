const router = require('express').Router();
let Week = require('../models/week.model');

router.route('/add').post((req, res) => {
    const userId = req.body.userId;
    const name = req.body.name;
    const goals = req.body.goals;
    const note = req.body.note;
    const unixStamp = req.body.unixStamp;

    const newWeek = new Week({
        userId,
        name,
        goals,
        note,
        unixStamp
    });

    newWeek.save()
        .then(() => res.json('Week added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update').post((req, res) => {
    Week.findById(req.body.id)
        .then(week => {
            week.name = req.body.name;
            week.goals = req.body.goals;
            week.note = req.body.note;

            week.save()
                .then(() => res.json('Week updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/last').post((req, res) => {
    Week.find({ userId: req.body.userId }).sort({ _id: -1 }).limit(1)
        .then(week => {
            res.json(week);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete').delete((req, res) => {
    Week.findByIdAndDelete(req.params.id)
        .then(() => res.json('Week deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;