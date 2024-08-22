import React from 'react';
import { motion } from 'framer-motion';

export default function Hero({ title, subtitle, buttonText }) {
    return (
        <section 
            id="home" 
            className="relative bg-cover bg-center min-h-screen text-white flex items-center justify-center" 
            style={{ backgroundImage: "url('./forbg.jpeg')" }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            <div className="relative z-10 text-center px-6">
                <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 p-8 rounded-2xl shadow-2xl border-2 border-white border-opacity-40 max-w-lg mx-auto transform hover:scale-105 transition-transform duration-300 ease-in-out">
                    <motion.h1 
                        className="text-4xl md:text-6xl font-bold mb-4 text-white relative z-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, type: "spring", stiffness: 120 }}
                    >
                        {title}
                    </motion.h1>
                    <motion.p 
                        className="text-xl md:text-2xl mb-6 text-gray-100 relative z-10"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        {subtitle}
                    </motion.p>
                    <motion.a 
                        href="#projects" 
                        className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-110"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                    >
                        {buttonText}
                    </motion.a>
                </div>
            </div>
        </section>
    );
}
