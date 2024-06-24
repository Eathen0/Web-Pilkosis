import multer from 'multer';

import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
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

// Define a file filter function for validation
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        // Accept the file
        cb(null, true);
    } else {
        // Reject the file
        cb(new Error('Only image files are allowed!'), false);
    }
};

const UploadMiddleware = {
    storage: storage,
    fileFilter: fileFilter
}

export default UploadMiddleware

