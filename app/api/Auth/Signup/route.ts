import { NextResponse } from "next/server";
import { User } from "@/app/models/User";
import { connectToDatabase } from "@/app/lib/db";
interface UserInput {
  email: string;
  username: string;
  password: string;
}
export async function POST(req: Request) {
  try {
    const body: UserInput = await req.json();
    if (!body.email || !body.username || !body.password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }
    await connectToDatabase();

    const emailChecked = await User.findOne({ email: body.email });
    if (emailChecked) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 },
      );
    }
    const newUser = new User(body);
    await newUser.save();
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 },
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 },
    );
  }
}
