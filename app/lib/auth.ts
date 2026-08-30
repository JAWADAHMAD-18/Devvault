import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function getUserFromToken(req: NextRequest){
    const token=req.cookies.get('token')?.value;
    if(!token){
        return null;
    }
    try {
        const data=jwt.verify(token,process.env.JWT_SECRET as string);
        if(!data){
            return null;
        }
        return data as {email:string,userId:string};    
        

    } catch (error) {
        return null;
        
    }
}