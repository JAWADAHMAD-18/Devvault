import { NextRequest,NextResponse } from "next/server";
import {getUserFromToken} from "@/app/lib/auth";
import {connectToDatabase} from "@/app/lib/db";
import { Note } from "@/app/models/Note";

interface Update{
    title?:string;
    content?:string;
    code?:string;
    language?:string;
    tags?:string[];
}
//partial task wala concept add karna hy ab 
export async function PATCH(req:NextRequest,{params}:{params:{id:string}}){
    const note_id=params.id;
    const user = await getUserFromToken(req);
    if(!user){
        return NextResponse.json({message:"Unauthorized"},{status:401});
    }
    try {
        const data:Partial<Update>=await req.json();
        await connectToDatabase();
        const note=await Note.findById(note_id);
        if(!note){
            return NextResponse.json({message:"Note not found"},{status:404});
        }
        if(note.owner.toString()!==user.userId){
            return NextResponse.json({message:"Unauthorized"},{status:403});
        }
        await Note.findByIdAndUpdate(note_id,data);
        return NextResponse.json({message:"Note updated successfully"},{status:200});
        
        
    } catch (error) {
        return NextResponse.json({message:"Error updating note"},{status:500});
        
    }
}


export async function DELETE(req:NextRequest,{params}:{params:{id:string}}){
     const note_id=params.id;
    const user = await getUserFromToken(req);
    if(!user){
        return NextResponse.json({message:"Unauthorized"},{status:401});
    }
    try {
        await connectToDatabase();
        const note=await Note.findById(note_id);
        if(!note){
            return NextResponse.json({message:"Note not found"},{status:404});
        }
        if(note.owner.toString()!==user.userId){
            return NextResponse.json({message:"Unauthorized"},{status:403});
        }
        await Note.findByIdAndDelete(note_id);
        return NextResponse.json({message:"Note deleted successfully"},{status:200});
        
    } catch (error) {
        return NextResponse.json({message:"Error deleting note"},{status:500});
        
    }
}