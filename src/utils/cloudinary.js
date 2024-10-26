import{v2 as cloudinary} from "cloudinary"
import fs from "fs" 
import { express } from 'express';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const uploadOncloudinary = async (localfilepath) =>{
try {
    if(!localfilepath) return null
        //upload the file on cloudinery
    const responce = await cloudinary.uploader.upload(localfilepath,{
        resource_type:"auto"
        
    })
    //file has been uoload sucessfully
    console.log("file on uploaded on cloudinary",responce.url);
    return responce;
} catch (error) {
    fs.unlinkSync(localfilepath)//remove the locally  temporary saved file as upload praion got falied
    return null;
    
}
}


cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/as/Olympic_flag.jpg",
    {
        public_acid:"olympic_flag"
    },
    function(error,result){console.log(result);

    });
export {uploadOncloudinary}