 import {connect} from "@/dbConfig/db";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request : NextRequest){
 try {
  const reqBody = await request.json()
  const {email , password} = reqBody;
  console.log(reqBody);

  const user =await User.findOne({email})
  
  if(!user){
    return NextResponse.json({error:"user does not exist"},{status:400})
  }

   // check if password is correct

   const validPassword = await bcryptjs.compare(password, user.password)

   if(!validPassword){
    return NextResponse.json({error:"Invalid Password"},{status:400})
   }
   
   // Create token data

   const tokenData = {
    id:user._id,
    username: user.username,
   }

   // create token

   const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn:"1d"})

   const response = NextResponse.json({
    message:"Login Succesfully",
    success:true
   })

   response.cookies.set("token",token,{
    httpOnly:true,
   })

   return response;

 } catch (error: any) {
    return NextResponse.json({error: error.message},{status:500})
 }
}