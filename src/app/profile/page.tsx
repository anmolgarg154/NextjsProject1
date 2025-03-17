"use client"
import axios  from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Profile(){
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);

    const logout = async ()=>{
            try {
               await axios.get("/api/user/logout")
               router.push("/login")

            } catch (error:any) {
                console.log("Error",error.message)
            }
    }
    return(
        <div className=" px-2 mt-2">
            <nav className="bg-gray-600 shadow-md">
      <div className="row  sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-white text-2xl font-bold">
            MyLogo
          </Link>

          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link href="/about" className="text-white hover:text-gray-300">
              About
            </Link>
            <Link href="/services" className="text-white hover:text-gray-300">
              Services
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-300">
              Contact
            </Link>
           
          </div>
         
          <div>
          <Link href="" onClick={logout} className="text-white"> Logout</Link>
          </div>
        </div>

       
      </div>
    </nav>
          
        </div>
    )
}