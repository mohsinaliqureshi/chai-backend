import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

import { User } from '../models/user.model.js';
import { uploadOncloudinary } from "../utils/cloudinary.js" ;
import { ApiRsponse } from "../utils/ApiResponse.js";
import { ApiRsponse } from 'module';



const registerUser =asyncHandler(async (req,res) => {
  
  //get user detail from frontend
  //validation-not empty
  // check if user alredy exists;username,email
  //check for image and avatar
  //uplod them to cloudnery,avatar
  //create user object 
  //create user object create entery in db
  //remove password and refresh token filed
  // check for user creation
  // return responce
  const{fullName, email, username, password} =req.body
  console.log("email",email);
   if (
    [fullName,email,username,password].some((field) => field?.trim()==="")
    
   ){
      throw new ApiError (400," All filed are required")
   }

   const existeduser = User.findOne({
    $or: [{username}, { email }]
   })
   
   if(existeduser){
    throw new ApiError(409,"username with email already exist")
   }

   const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
  
    if(!avatarLocalPath){
     throw new ApiError (400,"Avatar file is required")
    }
   const avatar = await uploadOncloudinary(avatarLocalPath)
  const coverImage =  await uploadOncloudinary(coverImage)

if(!avatar){
  throw new ApiError (400,"Avatar file is required")

}


const user = await User.create({
  fullName,
  avatar: avatar.url,
  coverImage: coverImage?.url || "",
  email,
  password,
  username: uploadOncloudinary.tolowerCase()
})

const createdUser = await user.findById(user._id).slect(
  "-password -refreshToken"
)
if(!createdUser){
  throw new ApiError(500, "something went wrong while registering the user")
}
return res.status(201).json(
  new ApiRsponse(200,createdUser,user reistered sucessfully"")
)
})

export{registerUser}