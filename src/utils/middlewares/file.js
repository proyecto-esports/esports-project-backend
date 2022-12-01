import multer from "multer"
import { cloudinary } from "cloudinary";
import {CloudinaryStorage} from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "incidentnode",
    allowedFormats: ["jpg", "png", "jpeg", "gif"],
  },
});

const upload = multer({ storage });
export default upload;
