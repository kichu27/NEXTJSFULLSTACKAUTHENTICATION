import { NextResponse } from "next/server";
import User from "@/models/usermodel";
import connect from "@/lib/dbconn";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/app/helpers/mailer";


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
     const saveduser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log(saveduser);
    //send verification email
  
    if(saveduser)
    {
      await sendEmail(email ,"VERIFY" ,saveduser._id)

    }
    else{
console.log("no VERIFICATION POSSIBLE !");
    }
    

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