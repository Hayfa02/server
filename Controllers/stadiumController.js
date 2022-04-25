const Stadium = require("../models/Stadium");
exports.AddStadium = async (req, res) => {
    try {
       await Stadium(req.body).save().then(()=> {
            return res.status(200).json({ message: "Your Demande Is Submitted We Contact You soon" });
        }).catch((error) => {
            return res.status(404).json({ message: "Erreur d'ajout" })
        })
    } catch (e) {
        res.status(500).send({ message: e.error || "server error" });
    }
}
exports.getAllStadiums =async (req, res) => {
    console.log(req.query);
    if(req.query.page==null||isNaN(req.query.page)) req.query.page=0
    if(req.query.ville==null) req.query.ville=""
    try {
        Stadium.find({ 'adress.city':{ $regex: req.query.ville }},(err, result) => {
            if (result) return res.status(200).json(result)
            if (err) return res.status(404).json({ message: "No Staduims Found" })
        }).skip(req.query.page*12).limit(12).sort({name:1})
    } catch (e) {
        res.status(500).send({ message: e || "server error" });
    }
}
exports.getStadiumById = (req, res) => {
    try {
        Stadium.findById(req.body.stadiumId,(err, result) => {
            if (result) return res.status(200).json(result)
            if (err) return res.status(404).json({ message: "No Staduims Found" })
        })
    } catch (e) {
        res.status(500).send({ message: e || "server error" });
    }
}
exports.getStadiumsByName = (req, res) => {
    let name = req.body.name
    try {
        Stadium.find({ name: { $regex: name } }, (err, result)=> {
            if (result) return res.status(200).json(result)
            if (err) return res.status(404).json({ message: "No Staduims Found" })
        }).limit(10)
    } catch (e) {
        res.status(500).send({ message: e });
    }
}
exports.getStadiumsByRating = (req, res) => {
    try {
        Stadium.find({ rating: { $gte: req.body.rating } }, function (err, result) {
            if (result) return res.status(200).json(result)
            if (err) return res.status(404).json({ message: "No Staduims Found" })
        }).limit(10)
    } catch (e) {
        res.status(500).send({ message: e });
    }
}
exports.getStadiumsByCity = (req, res) => {
    try {
        Stadium.find({ 'adress.city': req.body.city }, function (err, result) {
            if (result) return res.status(200).json(result)
            if (err) return res.status(404).json({ message: "No Staduims Found" })
        }).limit(10)
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: e });
    }
}
exports.verifyStadium = (req, res) => {
    try {
        Stadium.findByIdAndUpdate(req.body.id, { $set: { verified: true } }, (err, result)=> {
            if (result) return res.status(200).json({ message: "Phone number verified"})
            if(err) return res.status(400).json({ message: "Erreur" });
        })
    } catch (e) {
        res.status(500).json({ message: e });
    }
}
exports.disableStadium = (req, res) => {
    try {
        const stadium=Stadium.findByIdAndUpdate(req.body.id, { $set: { verified: false } }, (err, result)=> {
            if (result) return res.status(200).json({ message: "Stadium "+stadium.name+" was disabled" });
            if(err) return res.status(400).json({ message: "Erreur" });

        })
    } catch (e) {
        res.status(500).json({ message: e });
    }
}
exports.rateStadium = async (req, res) => {
    try {
        if (req.body.rate >= 1 && req.body.rate <= 5) {
            Stadium.findByIdAndUpdate(req.body.stadiumId, { $inc: { "rating.rates": req.body.rate, "rating.number": 1 } }, function (err, result) {
                console.log(result)
                if (result) {
                    res.send({ message: true })
                }
                else {
                    res.send({ message: false })
                }

            })
        }
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: e });
    }
}
exports.getInVerifiedStadiums = (req, res) => {
    try {
        Stadium.find({ verified: false }, function (err, result) {
            if (result) return res.status(200).json(result)
            if (err) return res.status(404).json({ message: "No Staduims Found" })
        }).limit(10)
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: e });
    }
}


