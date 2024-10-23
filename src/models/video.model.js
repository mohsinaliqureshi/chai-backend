import mongoose,{Schema} from mongoose;
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
{
    videofile:{
        type:string,//cloudnery url
        video:true
    },


thumbnail:{
    type:string,
    rquired:true

},
title:{
    type:string,
    rquired:true

},
description:{
    type:string,
    rquired:true

},
duration:{
    type:number, //cloudnery url
    rquired:true

},
view:{
    type:number,
    default:0

},
isPublished:{
    type:boolean,
    default:true

},
owner:{
    type: Schema.Types.objectId,
    ref:user
}

},
{
timeStamp: true
}

)

videoSchema.pulgin(mongooseAggregatePaginate)

export const video = mongoose.model("video",videoSchema)