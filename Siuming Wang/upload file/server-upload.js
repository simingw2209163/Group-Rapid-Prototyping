const express = require('express');
const multer = require('multer');
const uuid = require('uuid').v4;


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        // or 
        // uuid, or fieldname
        cb(null, originalname);
    }
})

const upload = multer({ storage }); // or simply { dest: 'uploads/' }
//const upload = multer({ dest: 'uploads/' }); // or simply { dest: 'uploads/' }

const app = express();
app.use(express.static('public'));

app.post('/upload', upload.array('avatar'), (req, res) => {
    return res.json({ status: 'OK', uploaded: req.files.length });
});

app.listen(3001,()=> console.log('App is listening'));