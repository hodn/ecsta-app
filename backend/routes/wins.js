const router = require('express').Router();
let Win = require('../models/win.model');

router.route('/random').get((req, res) => {
    Win.countDocuments().exec(function (err, count) {

        // Get a random entry
        var random = Math.floor(Math.random() * count)

        // Again query all users but only fetch one offset by our random #
        Win.findOne().skip(random).exec(
            function (err, result) {
                // Random user
                res.json(result)
            })
    })
});

router.route('/add').post((req, res) => {
    const userId = req.body.userId;
    const weekId = req.body.weekId;
    const wins = req.body.wins;
    const name = req.body.name;
    const note = req.body.note;
    const unixStamp = req.body.unixStamp;

    const newWin = new Win({
        userId,
        weekId,
        wins,
        name,
        note,
        unixStamp
    });

    newWin.save()
        .then(() => res.json('Win added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update').post((req, res) => {
    Win.findById(req.body.id)
        .then(win => {
            win.weekId = req.body.weekId;
            win.name = req.body.name;
            win.note = req.body.note;
            win.wins = req.body.wins;

            win.save()
                .then(() => res.json('Win updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete').delete((req, res) => {
    Win.findByIdAndDelete(req.params.id)
        .then(() => res.json('Win deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;