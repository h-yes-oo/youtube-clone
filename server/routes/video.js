const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");

const multer = require("multer");
const path = require('path');
var ffmpeg = require("fluent-ffmpeg");

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

router.post('/thumbnail', (req,res) => {

    let filePath = '';
    let fileDuration = '';

    ffmpeg.ffprobe(req.body.url, function(err, metadata){
        fileDuration = metadata.format.duration;
    })

    //썸네일 생성 후 비디오 러닝타임 가져오기
    ffmpeg(req.body.url)
    .on('filenames', function(filenames) {
        console.log('Will generate ' + filenames.join(', '));
        console.log(filenames);
        filePath = "uploads/thumbnails/" + filenames[0]
    })
    .on('end', function() {
        console.log('Screenshots taken');
        return res.json({ success: true, url: filePath, fileDuration: fileDuration})
    })
    .on('error', function(err){
        console.error(err);
        return res.json({ success: false, err });
    })
    .screenshots({
        count: 3,
        folder: 'uploads/thumbnails',
        size: '320x240',
        filename: 'thumbnail-%b.png'
    })
})

router.post('/uploadVideo', (req,res) => {
    const video = new Video(req.body);

    video.save((err, doc) => {
        if(err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    })
})

module.exports = router;