import multer from "multer"
import cloudinary  from 'cloudinary';
import {CloudinaryStorage} from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "avatars",
    allowedFormats: ["jpg", "png", "jpeg", "gif"],
  },
});

const upload = multer({ storage });
export default upload;
