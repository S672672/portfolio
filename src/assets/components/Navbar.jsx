import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 p-4 shadow-lg z-50">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-jaini tracking-wide relative">
                    Smith Bhattarai
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg blur-md opacity-30 -z-10"></div>
                </h1>
                
                {/* Hamburger Icon for Mobile */}
                <div className="lg:hidden text-white text-3xl cursor-pointer" onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>

                {/* Desktop Menu */}
                <ul className="hidden lg:flex space-x-6">
                    {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                        <motion.li
                            key={item}
                            className="relative text-white font-bold hover:text-yellow-300"
                            whileHover={{ scale: 1.1, color: "#FBBF24" }}
                            transition={{ duration: 0.3 }}
                        >
                            <a href={`#${item.toLowerCase()}`}>
                                {item}
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-600 rounded-lg blur-md opacity-20 -z-10"></div>
                            </a>
                        </motion.li>
                    ))}
                </ul>

                {/* Mobile Dropdown Menu */}
                {isOpen && (
                    <div className="lg:hidden absolute top-16 left-0 w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 p-4 shadow-lg">
                        <ul className="flex flex-col space-y-4">
                            {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                                <motion.li
                                    key={item}
                                    className="relative text-white font-bold text-center hover:text-yellow-300"
                                    whileHover={{ scale: 1.1, color: "#FBBF24" }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <a href={`#${item.toLowerCase()}`} onClick={toggleMenu}>
                                        {item}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}
