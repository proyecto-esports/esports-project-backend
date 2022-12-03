import cloudinary  from "cloudinary";

const deleteFile = (imgUrl) => {
  const imgSplited = imgUrl.split("/");
  const nameSplited = imgSplited[imgSplited.length - 1].split(".");
  const folderSplited = imgSplited[imgSplited.length - 2];
  const public_id = `${folderSplited}/${nameSplited[0]}`;
  cloudinary.v2.uploader.destroy(public_id, () => {
    console.log("Image delete in cloudinary");
  });
};

export default deleteFile;
