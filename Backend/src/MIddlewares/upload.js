// const multer = require('multer');
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
// module.exports = upload;

const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1024 // 1GB max per file (adjust as needed)
    }
});

module.exports = upload;
