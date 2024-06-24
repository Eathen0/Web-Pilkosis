import multer from 'multer';

import fs from 'fs';
import path from 'path';

const UploadMiddleware = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadsDir = path.join(__dirname, '/../uploads/');
        fs.mkdirSync(uploadsDir, { recursive: true });
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueFilename = Date.now() + '-' + file.originalname;
        cb(null, uniqueFilename);
    }
});

export default UploadMiddleware;
