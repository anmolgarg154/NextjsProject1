"use client"
import axios  from "axios";
import { useRouter } from "next/navigation";


export default function Profile(){
    
    const router = useRouter()
    const logout = async ()=>{
            try {
               await axios.get("/api/user/logout")
               router.push("/login")

            } catch (error:any) {
                console.log("Error",error.message)
            }
    }
    return(
        <div className="flex flex-cols justify-between px-2 mt-2">
            <h1 className=" text-center">Profile Page</h1>
            
             <button onClick={logout} className="bg-blue-500 font-bold py-2 px-4 rounded">
                LogOut
             </button>
        </div>
    )
}