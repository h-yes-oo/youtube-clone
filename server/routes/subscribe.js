const express = require('express');
const router = express.Router();

const { Video } = require("../models/Video");
const { Subscriber } = require("../models/Subscriber")

router.post("/subscribeNumber", (req, res) => {
    Subscriber.find({ 'userTo': req.body.userTo })
    .exec((err, subscribe) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({ success: true, subscribeNumber: subscribe.length})
    })
})

router.post("/subscribed", (req, res) => {
    Subscriber.find({'userTo': req.body.userTo, 'userFrom': req.body.userFrom}).exec((err, subscribed) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({ success: true, subscribed: subscribed.length !== 0 ? true : false})
    })
})

module.exports = router;