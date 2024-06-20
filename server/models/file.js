import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cloudinary_id: {
        type: String,
        required: true
    },
    downloadCount: {
        type: Number,
        required: true,
        default: 0
    },
});

const File = mongoose.model('File', FileSchema);

export default File;
