import React from 'react';
import { motion } from 'framer-motion';

export default function Hero({ title, subtitle, buttonText }) {
    return (
        <section 
            id="home" 
            className="relative bg-cover bg-center h-screen text-white flex items-center justify-center" 
            style={{ backgroundImage: "./src/assets/pictures/smith.png" }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
            <div className="relative z-10 text-center px-6">
                <motion.h1 
                    className="text-4xl md:text-6xl font-bold mb-4 text-blue-700"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    {title}
                </motion.h1>
                <motion.p 
                    className="text-xl md:text-2xl mb-8 text-black"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    {subtitle}
                </motion.p>
                <a 
                    href="#projects" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                >
                    {buttonText}
                </a>
            </div>
        </section>
    );
}
