import multer, { StorageEngine } from 'multer';
import { Request } from 'express';
import path from 'path';

// Configure storage options for multer with TypeScript
const storage: StorageEngine = multer.diskStorage({
    // Specify the destination for uploaded files
    // destination: (req: Request, file: Express.Multer.File, callback) => {
    //     callback(null, path.join(__dirname, '../uploads')); // Ensure 'uploads' directory exists or adjust path accordingly
    // },
    // Configure the filename for uploaded files
    filename: (req: Request, file: Express.Multer.File, callback) => {
        callback(null, `${Date.now()}_${file.originalname}`);
    }
});

// Set up multer with the storage configuration
const upload = multer({
    storage: storage,
});

export default upload;
