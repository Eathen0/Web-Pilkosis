import multer, { StorageEngine } from 'multer';
import fs from 'fs';
import path from 'path';
import { Request } from 'express';


const uploadsDir = path.resolve(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage: StorageEngine = {
    _handleFile: (req: Request, file: Express.Multer.File, cb: (error: Error | null, info?: Partial<Express.Multer.File>) => void) => {
        const uniqueFilename = `${Date.now()}-${file.originalname}`;
        const filePath = path.join(uploadsDir, uniqueFilename);

        const writeStream = fs.createWriteStream(filePath);

        file.stream.pipe(writeStream)
            .on('error', (error) => cb(error))
            .on('finish', () => cb(null, { filename: uniqueFilename, path: filePath })); 
    },
    _removeFile: (req: Request, file: Express.Multer.File, cb: (error: Error | null) => void) => {
        fs.unlink(file.path, (err) => cb(err));
    }
};

const uploadMiddleware = multer({ storage });

export default uploadMiddleware;
