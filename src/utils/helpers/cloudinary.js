// instalar cloudinary multer multer-storage-cloudinary

import  cloudinary  from "cloudinary";

// Meter en .env los datos

const setUpCloudinary = () => {
  cloudinary.config({

    cloud_name: 'dlqo06xcs',
    api_key: '811959895785168',
    api_secret: 'ctWlZEYNGeVxKmypGG0dBdfMyws',

  });
};

export default setUpCloudinary
