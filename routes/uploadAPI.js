const express = require('express')
const multer = require('multer');
const path = require('path');
const router = express.Router();
const User = require('../models/userSchema');


//create the storage 
const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = path.resolve('./uploads')
        // console.log(folder)
        cb(null, folder)
    },
    filename: async (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const newFileName = file.fieldname + '-' + Date.now() + extension;
        // console.log(newFileName);

        // update the current user photo
        await User.findByIdAndUpdate(req.params.id, { photo: newFileName }, { new: true })
        cb(null, newFileName);
    },

});
// file filter 
const allowedFileExtentions = ['.jpg', '.jpeg', '.png', '.gif']
const myFileFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, allowedFileExtentions.includes(extension));
    //     if (extension == '.jpg' || extension == '.jpeg' || extension == '.png') {
    //         cb(null, true);
    //     }
    //     else {
    //         cb(null, false);
    //     }


}

// creat a multer midleweare
const upload = multer({ storage: myStorage, fileFilter: myFileFilter, limits: { fieldSize: 1024 * 1024 * 20 } })

router.post('/uploadImage/:id', upload.single('img'), async (req, res) => {
    res.json({ message: 'immage uploaded successfully' })
});
// upload Multiple immage
router.post('/uploadImages', upload.array('img', 3), async (req, res) => {
    res.json({ message: 'immage uploaded successfully' })
});

module.exports = router;
