import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
    driver: 's3' | 'disk';
    config: {
        disk: {
            tmpFolder: string;
            uploadsFolder: string;
            storage: multer.StorageEngine;
        };
        aws: {
            bucket: string;
        };
    };
}

export default {
    driver: process.env.STORAGE_DRIVER || 'disk',
    config: {
        disk: {
            tmpFolder,
            uploadsFolder: path.resolve(tmpFolder, 'uploads'),
            aws: {
                bucket: process.env.S3_BUCKET,
            },
            storage: multer.diskStorage({
                destination: tmpFolder,
                filename(request, file, callback) {
                    const fileHash = crypto.randomBytes(10).toString('hex');
                    const fileName = `${fileHash}-${file.originalname}`;

                    return callback(null, fileName);
                },
            }),
        },
        aws: {
            bucket: 'rocketseat-gostack-app-gobarber',
        },
    },
} as IUploadConfig;
