import {v2 as cloudinary} from 'cloudinary'
import 'dotenv/config';

if(!process.env.CLOUDINARY_CLOUD_NAME){
  console.error("Clodinary credentials not found. Check your server variables.")
}


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadToCloudinary = (fileBuffer, fileName) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'profile_pictures', public_id: fileName, overwrite: true, invalidate: true, resource_type: 'image' }, // Optional to Organize in a folder
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    // Write the buffer to the stream
    uploadStream.end(fileBuffer);
  });
};
export default uploadToCloudinary;