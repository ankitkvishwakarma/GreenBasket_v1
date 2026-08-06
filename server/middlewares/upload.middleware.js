import multer from "multer";

/* =====================================================
   Memory Storage
===================================================== */

const storage = multer.memoryStorage();

/* =====================================================
   Allowed File Types
===================================================== */

const allowedMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

/* =====================================================
   File Filter
===================================================== */

const fileFilter = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new Error(
        "Only JPG, JPEG, PNG and WEBP images are allowed."
      ),
      false
    );
  }

  cb(null, true);
};

/* =====================================================
   Multer Configuration
===================================================== */

const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB

    files: 5,
  },
});

export default upload;