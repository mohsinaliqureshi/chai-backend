import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
 import { ApiResponse } from "../utils/ApiResponse.js";  
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const registerUser = asyncHandler(async (req, res) => {
  
  // Get user details from frontend
  const { fullName, email, username, password } = req.body;
  
  // console.log("email", email);

  // Validation - check for empty fields
  if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ username }, { email }]
  });
  
  if (existingUser) {
    throw new ApiError(409, "User with the provided username or email already exists");
  }

  // Check and upload avatar and cover image if provided
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
  // console.log(req.files);
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  let coverImageLocalPath ;
  if(req.file && Array.isArray(req.files.coverImage) && req.file.coverImage.length>0) {
    coverImageLocalPath = req.files.coverImage[0].path

  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

  if (!avatar) {
    throw new ApiError(400, "Failed to upload avatar");
  }

  // Create user object and store in the database
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  });

  // Retrieve the created user excluding password and refreshToken fields
  const createdUser = await User.findById(user._id).select("-password -refreshToken");
  
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // Return response
  return res.status(201).json(
    new ApiResponse(201, createdUser, "User registered successfully")
  );
});

export { registerUser };
