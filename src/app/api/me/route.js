import getdatafromthetoken from "@/app/helpers/getdatafromthetoken";
import User from "@/models/usermodel";
import { NextResponse } from "next/server";




export async function GET(request)
{


    try {
        const userid = await getdatafromthetoken(request) 
const user = await User.find({_id:userid}).select(("-password")) ;
console.log(user); 
return NextResponse.json(user) 



    } catch (error) {
      console.log(error);  
    }







}