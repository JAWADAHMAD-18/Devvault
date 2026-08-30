import mongoose,{ Schema } from "mongoose";
export interface Note extends mongoose.Document{
    title:string,
    content:string,
    code?:string,
    language?:string,
    tags:string[],
    owner?:string,
    
}

const noteSchema=new Schema<Note>({
    title:{type:String,required:true},
    content:{type:String,required:true},
    code:{type:String},
    language:{type:String},
    tags:{type:[String],required:true},
    owner:{type:Schema.Types.ObjectId,ref:"User",required:true},
},{timestamps:true});

export const Note=mongoose.model<Note>("Note",noteSchema);
