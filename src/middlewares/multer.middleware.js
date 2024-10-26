import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp"); // Directory where files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Using original filename
    }
});

export const upload = multer({ storage });
