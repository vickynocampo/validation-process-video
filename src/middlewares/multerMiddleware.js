const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, "../public/images/avatars" ));
    },
    filename: (req, file, cb) => {
      
        let nameFile = Date.now() + "img" + path.extname(file.originalname);
        cb(null, nameFile );
    }
})

module.exports = multer({storage});