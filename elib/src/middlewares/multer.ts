import multer from "multer";
import path from "node:path";

// file store local -> upload to cloudinary -> then after delete from local
const upload = multer({
    dest: path.resolve(__dirname, "../../public/data/uploads"),

    //todo: put limit 10MB max
    limits: { fileSize: 3e7 }, // 30MB
});

const uploadMiddleware = upload.fields([
    {
        name: "coverImage",
        maxCount: 1,
    },
    {
        name: "file",
        maxCount: 1,
    },
]);

export default uploadMiddleware;
