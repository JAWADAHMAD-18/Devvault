import { NextResponse } from "next/server";
import { User } from "@/app/models/User";
import { connectToDatabase } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
interface LoginInput {
  email: string;
  password: string;
}
export async function POST(req: Request) {
  try {
    const data: LoginInput = await req.json();
    if (!data.email || !data.password) {
      return NextResponse.json(
        { Message: "Missing values please chek out again " },
        { status: 400 },
      );
    }
    await connectToDatabase();
    const findUser = await User.findOne({ email: data.email });
    if (!findUser) {
      return NextResponse.json({ Message: "User not found " }, { status: 401 });
    }
    const isPasswordMatch = await bcrypt.compare(
      data.password,
      findUser.password,
    );
    if (!isPasswordMatch) {
      return NextResponse.json(
        { Message: "Invalid credentials" },
        { status: 401 },
      );
    }
    const token = jwt.sign(
      { email: findUser.email, id: findUser._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" },
    );
    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 },
    );
    response.cookies.set("token", token, {
       httpOnly: true,
       secure: process.env.NODE_ENV === "production",
       sameSite: "strict",
       maxAge: 60*60*24*7,
       path: "/",
     });
     return response
  } catch (error) {
    return NextResponse.json({ Message: "Error logging in" }, { status: 500 });
  }
}
