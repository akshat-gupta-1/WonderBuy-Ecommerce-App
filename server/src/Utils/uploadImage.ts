import { v2 as cloudinary } from 'cloudinary';
const uploadImage = (image: string, imageId: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      image,
      { public_id: imageId },
      function (err, result) {
        if (result && result.secure_url) {
          return resolve(result.secure_url);
        } else {
          return reject(err);
        }
      }
    );
  });
};
export default uploadImage;
