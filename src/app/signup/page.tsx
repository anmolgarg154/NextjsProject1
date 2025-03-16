"use client"
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";

export default function SignupPage() {
    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisable,setButtonDisable] = React.useState(false);
    const [loading,setLoading] = React.useState(false)

    const onSignUp = async () => {
           try {
            setLoading(true)
           const response = await axios.post("/api/user/signup",user);
           console.log("Api Data",response.data)
           router.push("/login");
           } catch (error) {
             console.log("Error",error);
           } finally{
                setLoading(false)
           }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisable(false);
        }
        else{
            setButtonDisable(true);
        }
    },[user])
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-center text-3xl font-semibold text-gray-700">{loading?"Processing":"Register"}</h1>
            <br />
            <div className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-gray-600 font-medium">Username</label>
                    <input id="username"  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none" placeholder="Enter your username" type="text" onChange={(e) => setUser({ ...user, username: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-600 font-medium">Email</label>
                    <input id="email" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none" placeholder="Enter your email" type="email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="password" className="block text-gray-600 font-medium">Password</label>
                    <input id="password" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none" placeholder="Enter your password" type="password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
                </div>
                <button onClick={onSignUp} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                    {buttonDisable?"No SignUp":"SignUp"}
                </button>
            </div>
            <p className="text-center text-gray-600 mt-4">
                Already have an account? 
                <Link href="/login" className="text-blue-500 hover:underline ml-1">Login</Link>
            </p>
        </div>
    </div>
    
    )
}