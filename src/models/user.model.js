import mongoose, { Schema } from "mongoose"; // Fixed import
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true // Fixed the typo here
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true // Fixed the typo here
        },
        avatar: {
            type: String, // cloudinary URL
            required: true
        },
        coverImage: {
            type: String // cloudinary URL
        },
        watchHistory: [ // Fixed typo: 'watchHistroy' to 'watchHistory'
            {
                type: Schema.Types.ObjectId,
                ref: "video"
            }
        ],
        password: {
            type: String, // Fixed 'string' to 'String'
            required: [true, 'Password is required'] // Fixed 'require' to 'required'
        },
        refreshToken: {
            type: String
        }
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) { // Fixed 'method' to 'methods'
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () { // Fixed 'genrateAcessToken' to 'generateAccessToken'
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

userSchema.methods.generateRefreshToken = function () { // Fixed 'genrateRefreshToken' to 'generateRefreshToken'
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

export const User = mongoose.model("User", userSchema); // Fixed 'mongosse' to 'mongoose'
