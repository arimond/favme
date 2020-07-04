const multer = require('multer');

module.exports = class Multer {
    static getPublicUpload(){
        const storage = multer.diskStorage({
            destination: (req, file, result) => {
                result(null, __dirname+ '/../../public/images');
            },
            filename: (req, file, result) => {
                const imageUrl = new Date().toISOString() + file.originalname;
                // Check length to avoid database Error 
                result(null, imageUrl);
            }
        });
        const fileFilter = (req, file, result) => {
            // Validate file 
            if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                result(null, true);
            } else{
                result(null, false);
            }
        };
        const upload = multer({
            storage: storage,
            limits: {
                fileSize: 1024 * 1024 * 5
            },
            fileFilter: fileFilter
        });
        return upload;
    }
    static getPrivateUpload(){
        const storage = multer.diskStorage({
            destination: (req, file, result) => {
                result(null, __dirname+ '/../../private/images');
            },
            filename: (req, file, result) => {
                const imageUrl = new Date().toISOString() + file.originalname;
                result(null, imageUrl);
            }
        });
        const fileFilter = (req, file, result) => {
            // Validate file 
            if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                result(null, true);
            } else{
                result(null, false);
            }
        };
        const upload = multer({
            storage: storage,
            limits: {
                fileSize: 1024 * 1024 * 5
            },
            fileFilter: fileFilter
        });
        return upload;
    }
}