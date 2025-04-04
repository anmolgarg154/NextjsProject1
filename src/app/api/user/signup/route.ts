/* eslint-disable @typescript-eslint/no-explicit-any */
import {connect} from "@/dbConfig/db";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request : NextRequest){
 try {
  const reqBody = await request.json()
  const {username,email,password} = reqBody

  // check if user already exist
  const user = await User.findOne({email})

  if(user){
    return NextResponse.json({error:"USer already exist"},{status:400})
  }

  // hash Password
  const salt = await bcryptjs.genSalt(10)
  const hashedPassword = await bcryptjs.hash(password,salt)

  const newUser = new User({
    username,
    email,
    password:hashedPassword

  })

  const savedUser =  await newUser.save()
  console.log(savedUser);

  return NextResponse.json({
    message:"User created successfully",
    success:true,
    savedUser
  })

  
 } catch (error:any) {
    return NextResponse.json({error : error.message} , {status:500})
 }
}