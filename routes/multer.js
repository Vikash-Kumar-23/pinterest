const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
// Import necessary modules for file uploading and unique ID generation

// Set up storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/uploads'); // Specify the directory to store uploaded files
    },
    filename: (req, file, cb) => {
        const uniquename = uuidv4(); // Generate a unique identifier for the file
        cb(null,uniquename +path.extname(file.originalname) ); // Use the original file name with a unique prefix
    }
});

// Create the multer instance with the storage configuration
const upload = multer({ storage: storage });
// Export the upload instance for use in other parts of the application
module.exports = upload;