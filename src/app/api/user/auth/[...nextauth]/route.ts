import User from "@/models/userModel";
import { connect } from "@/dbConfig/db";
import { NextRequest,NextResponse } from "next/server";

connect()

export async function POST(request:NextRequest){
  try {
    const reqBody = await request.json()
    const {email} = reqBody

   
    console.log(reqBody);
    
    const user = await User.findOne({email})

    if(user){
        return NextResponse.json({error:"Email already exist"},{status:400})
    }

    const newUser = new User({email})

    const savedUser = await newUser.save()
    console.log("New USer",savedUser)

    return NextResponse.json({
        message:"User By Email created successfully",
        success:true,
        savedUser
    })


  } catch (error) {
    console.log("EMAIL Error",error)
  }
}