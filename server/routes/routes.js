import express from 'express';
import upload from '../utils/multer.js';
import { uploadImage } from '../controller/image-controller.js';
import File from '../models/file.js';

const router = express.Router();

router.post('/upload', upload.single('file'), uploadImage);

router.get('/:publicLink', async (req, res) => {
    try {
        const file = await File.findOne({ publicLink: req.params.publicLink });
        if (!file) {
            return res.status(404).send('File not found');
        }
        // Redirect to the Cloudinary URL
        res.redirect(file.path);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

export default router;
