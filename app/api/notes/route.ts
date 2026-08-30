import { getUserFromToken } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/db";
import { Note } from "@/app/models/Note";

interface Body {
  title: string;
  content: string;
  code?: string;
  language?: string;
  tags: string[];
}
export async function POST(req: NextRequest) {
  const user = await getUserFromToken(req);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, content, code, language, tags }: Body = await req.json();
    if (!title || !content || !tags) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }
    await connectToDatabase();
    const newNote = await Note.create({
      title,
      content,
      code,
      language,
      tags,
      owner: user.userId,
    });
    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating note" },
      { status: 500 },
    );
  }
}


export async function GET(req:NextRequest){
    const user = await getUserFromToken(req);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectToDatabase();
    const notes=await Note.find({owner:user.userId});
    return NextResponse.json(notes,{status:200});
    
  } catch (error) {
    return NextResponse.json(
      { message: "Error Fetching note" },
      { status: 500 },
    );
    
  }

}