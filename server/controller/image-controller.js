import cloudinary from '../utils/cloudinary.js';
import File from '../models/file.js';

export const uploadImage = async (req, res) => {
    try {
        // Log to check how many times this function is called
        console.log("Upload function called for file:", req.file.originalname);

        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'uploads',
        });

        // Log the result to ensure it's not being uploaded twice
        console.log("Uploaded to Cloudinary:", result.secure_url);

        // Generate a custom public link
        const count = await File.countDocuments();
        const publicLink = `publicLink${count + 1}`;

        // Create a new file record in the database
        const file = new File({
            path: result.secure_url,
            name: req.file.originalname,
            cloudinary_id: result.public_id,
            publicLink: publicLink
        });

        await file.save();

        // Log after saving to the database
        console.log("File saved to database:", file.name);

        // Respond with the URL of the uploaded file and the custom public link
        res.status(200).json({ path: file.path, publicLink: file.publicLink });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const getImage = async (req, res) => {
    try {
        const file = await File.findById(req.params.fileId);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        res.json(file);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
};