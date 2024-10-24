import mongosse,{Schema} from "mongoose" 
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username: {
            type:String,
            required: true,
            unique: true,
            lowercase:true,
            trim:true,
            index:true

        },
        email: {
            type:String,
            required: true,
            unique: true,
            lowercase:true,
            trim:true
            

        },
        fullName: {
            type:String,
            required: true,
            trim:true,
            index:ture
            

        },
        avatar: {
            type:String, //cloudinary url
            required: true,
            
            

        },
        coverImage: {
            type:String, //cloudinary url
            
            
            

        },
        watchHistroy:[
            {
            type: Schema.Types.ObjectId,
            ref: "video"
        }
        
    ],
    password:{
        type:string,
        require:[true, 'password is required']
    },
    refreshToken:{
        type: string
    }

}
)

userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();

    this.password =bcrypt.hash(this.password, 10)
    next()
})
userSchema.method.isPasswordCorrect = async function(password)
{
    return await bcrypt.compare(password,this.password)
}



userSchema.method.genrateAcessToken = function()
{
   return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username:this.username,
            fullName:this.fullName

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)

}



userSchema.method.genrateRefreshToken = function()

{
    return jwt.sign(
        {
            _id: this._id
          

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)

}
export const User = mongosse.model("User",userSchema)