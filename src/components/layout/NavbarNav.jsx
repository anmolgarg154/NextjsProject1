"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Image from "next/image";


const NavbarItem = () => {
    const [isLogin, setisLogin] = useState("Y");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter();

    const navStyle = "relative px-4 py-2 opacity-80 hover:opacity-100 hover:font-bold hover:bg-white hover:text-black transition-all ease-in-out duration-300 rounded-md";
    const navStyleSelected = "after:block after:absolute after:border-b-4 after:w-full after:border-white after:bottom-0 ";

    const navItems = [
        { label: "Home", to: "/" },
        { label: "About", to: "/About" },
        { label: "Bookings", to: "/Bookings" },
        { label: "Our Team", to: "/team" },
        { label: "Contact Us", to: "/contactUs" }
    ];

    const handleLogout = () => {
        setisLogin("N");
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full transition-all duration-500 z-50 ${
                isScrolled 
                    ? "bg-black shadow-[0_5px_15px_rgba(255,255,255,0.1)] text-white" 
                    : "bg-black text-white"
            } ${isScrolled ? "animate-slideDown" : "animate-fadeIn"}`}
        >
            <div className="container mx-auto flex items-center justify-between h-[80px] px-4 md:px-8">
                {/* Logo with Fade Animation */}
                <Link className="flex" href="/">
                    <Image 
                       src="/images/profile/logo2.jpg"
                        alt="Hotel Logo" 
                        width={75} 
                        height={50} 
                        className="rounded-full cursor-pointer transition-all duration-300 hover:scale-105 filter hover:brightness-110" 
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.to}
                            href={item.to}
                            className={`cursor-pointer hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] ${navStyle} ${router.pathname === item.to ? navStyleSelected : ""}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Profile or Login/Register */}
                <div className="hidden md:flex space-x-4 items-center">
                    {isLogin === "Y" ? (
                        <>
                            <Link href="/profile">
                                <Image 
                                    src='/images/profile/logo2.jpg' 
                                    alt="Profile" 
                                    width={60} 
                                    height={50} 
                                    className="rounded-full transition-all duration-300 hover:opacity-80 filter hover:brightness-110" 
                                />
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-white text-black px-6 py-2 rounded-lg transition-all duration-300 hover:bg-black hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link 
                                href="/login" 
                                className="bg-white text-black px-6 py-2 rounded-lg transition-all duration-300 hover:bg-gray-500 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                            >
                                Login
                            </Link>
                            <Link 
                                href="/register" 
                                className="border-2 border-white text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-white hover:text-black"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center">
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                        className="text-white text-2xl transition-transform duration-300 hover:rotate-180"
                    >
                        {isMobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-95 flex flex-col items-center justify-center space-y-4 text-white text-lg z-40 transform transition-all duration-500 ${
                    isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                }`}
            >
                {navItems.map((item, index) => (
                    <Link
                        key={item.to}
                        href={item.to}
                        className={`cursor-pointer ${navStyle} ${
                            router.pathname === item.to ? navStyleSelected : ""
                        } transition-all duration-300 delay-${index * 100}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {item.label}
                    </Link>
                ))}
                <div className="flex flex-col items-center space-y-4 mt-6">
                    {isLogin === "Y" ? (
                        <>
                            <Link 
                                href="/profile" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-white hover:text-gray-300 transition-colors duration-300"
                            >
                                Profile
                            </Link>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="bg-white text-black px-8 py-2 rounded-lg transition-all duration-300 hover:bg-gray-200 w-full"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link 
                                href="/login" 
                                onClick={() => setIsMobileMenuOpen(false)} 
                                className="bg-white text-black px-8 py-2 rounded-lg transition-all duration-300 hover:bg-gray-200 w-full text-center"
                            >
                                Login
                            </Link>
                            <Link 
                                href="/register" 
                                onClick={() => setIsMobileMenuOpen(false)} 
                                className="border-2 border-white text-white px-8 py-2 rounded-lg transition-all duration-300 hover:bg-white hover:text-black w-full text-center"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default NavbarItem;