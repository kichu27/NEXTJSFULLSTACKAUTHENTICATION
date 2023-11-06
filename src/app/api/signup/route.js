import { NextResponse } from "next/server";
import User from "@/models/usermodel";
import connect from "@/lib/dbconn";
import bcryptjs from "bcryptjs";


export async function POST(request) {
  try {
    await connect();
    const { username, email, password } = await request.json();

    // Check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create a new user and save it to the database
    await User.create({
      username,
      email,
      password: hashedPassword,
    });

  

      return NextResponse.json(
        { message: "User registered successfully" },
        { status: 201 }
      );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}