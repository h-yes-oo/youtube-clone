const express = require('express');
const router = express.Router();
//const { Video } = require("../models/Video");

const multer = require("multer");
const path = require('path');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

let fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname)
    //console.log(ext);
    if (ext !== '.mp4') {
        return cb(new Error('only mp4 is allowed'), false);
    }
    cb(null, true)
}

const upload = multer({ storage, fileFilter }).single("file");

router.post('/uploadfiles', (req, res) => {
    // 비디오를 서버에 저장
    upload(req, res, err => {
        if(err) {
            return res.json({ success: false, err})
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename})
    })
})

module.exports = router;