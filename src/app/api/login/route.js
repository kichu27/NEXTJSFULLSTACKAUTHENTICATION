
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"; 
import connect from "@/lib/dbconn";
import User from "@/models/usermodel";



export async function POST(request) {
  await connect();

  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    // Check if user exists
    const user = await User.findOne({ email });
 

    if (!user) {
      console.log("User does not exist");
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }
    else{
      console.log("User exists !");
    }

    // Check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      console.log("Invalid password");
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    } else {
      console.log("Password is valid");
    }

    // Generate a JWT with a hardcoded secret key
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    // Replace 'yourSecretKeyHere' with your actual secret key
    const token = jwt.sign(tokenData, 'yourSecretKeyHere', { expiresIn: "1d" });
    console.log("JWT generated:", token); // Log the generated JWT

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      http: true, 
      body: token, // Include the JWT in the response
    });

    console.log(response);
    return response;



  
  } catch (error) {
    console.error("Error:", error.message); // Log the error
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


