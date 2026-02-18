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


const uploadToCloudinary = (fileBuffer, fileName=null) => {
  return new Promise((resolve, reject) => {
    const options = { invalidate: true, resource_type: 'auto',
        transformation: [{ width: 1280, crop: "limit" },  { quality: "auto" }, { fetch_format: "auto" }]
       }

       if(fileName){
        options.public_id = fileName;
        options.folder = "profile_pictures";
        options.overwrite = true;
       }else{
        //if this is listing images
        options.folder = "listing_pictures"
       }

    const uploadStream = cloudinary.uploader.upload_stream(
      options, 
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