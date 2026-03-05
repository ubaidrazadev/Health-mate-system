import multer from 'multer';
import pkg from 'multer-storage-cloudinary';
const { CloudinaryStorage } = pkg;
import cloudinary from '../../Config/CloudinaryConfig/cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        const isPDF = file.mimetype === 'application/pdf'
        return {
            folder: 'health-mate',
            resource_type: isPDF ? 'raw' : 'image', 
            access_mode: 'public',                    
            type: 'upload',                           
        }
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }
});

export default upload;