import mongoose,{ Schema } from "mongoose";
import hash from "bcryptjs";
export interface User extends mongoose.Document {
    email: string;
    username: string;
    password: string;
}

const userSchema=new Schema<User>({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})
userSchema.pre("save",async function(){
    if (!this.isModified("password")) return;
    const salt=await hash.genSalt(10);
    this.password=await hash.hash(this.password,salt);
})


export const User=mongoose.model<User>("User",userSchema);
