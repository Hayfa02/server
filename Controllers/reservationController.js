const Reservation = require("../models/Reservation");
exports.AddReservation = (req, res) => {
    Reservation(req.body).save().then(data => {
        return res.status(200).json({
            message: "Your Demande Is Submitted We Contact You soon"
        });
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message: err.message || "Server Error."
        });
    })
}
exports.getAllReservations = (req, res) => {
    Reservation.find((err, result)=> {
        if (result) {
            res.send(result)
        }
        else {
            res.send({ message: "No Staduims Found" })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Server Error."
        })
    })
}
exports.getReservationsByStadiumId = (req, res) => {
    
    Reservation.find({ 'statiumId': req.body.statiumId },(err, result)=> {
        
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message: err.message || "Server Error."
        });
    })
}
exports.acceptReservatiaon = (req, res) => {
    
    Reservation.find({ 'statiumId': req.body.statiumId },(err, result)=> {
        
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message: err.message || "Server Error."
        });
    })
}