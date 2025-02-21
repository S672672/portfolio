import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [prevSection, setPrevSection] = useState("");

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        
        // Force recalculation of the active section after closing the menu
        setTimeout(() => {
            const sections = document.querySelectorAll("section");
            sections.forEach((section) => {
                if (section.getBoundingClientRect().top <= window.innerHeight / 2) {
                    setPrevSection(activeSection);
                    setActiveSection(section.id);
                }
            });
        }, 300);
    };

    useEffect(() => {
        const sections = document.querySelectorAll("section");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setPrevSection(activeSection);
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.1 }
        );

        sections.forEach((section) => observer.observe(section));

        return () => sections.forEach((section) => observer.unobserve(section));
    }, [activeSection]);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY === 0) {
                setPrevSection(activeSection);
                setActiveSection("home");
            }
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [activeSection]);


    return (
        <nav className="fixed top-0 left-0 w-full bg-black p-4 shadow-xl z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Brand Name */}
                <h1 className="text-cyan-400 text-3xl font-jaini tracking-wide relative">
                    Smith Bhattarai
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur-md opacity-20 -z-10"></div>
                </h1>

                {/* Hamburger Icon for Mobile */}
                <div className="lg:hidden text-cyan-400 text-3xl cursor-pointer" onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>

                {/* Desktop Menu */}
                <ul className="hidden lg:flex space-x-6">
                    {["home", "about", "skills", "projects", "contact"].map((item) => (
                        <motion.li
                            key={item}
                            className={`relative text-lg transition-all duration-300 ${
                                activeSection === item
                                    ? "text-white"
                                    : prevSection === item
                                    ? "text-yellow-400"
                                    : "text-cyan-400"
                            }`}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <a href={`#${item}`} className="relative">
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-md opacity-20 -z-10"></div>
                            </a>
                        </motion.li>
                    ))}
                </ul>

                {/* Mobile Dropdown Menu */}
                {isOpen && (
                    <div className="lg:hidden absolute top-16 left-0 w-full bg-black p-4 shadow-xl">
                        <ul className="flex flex-col space-y-4">
                            {["home", "about", "skills", "projects", "contact"].map((item) => (
                                <motion.li
                                    key={item}
                                    className={`relative font-bold text-center transition-all duration-300 ${
                                        activeSection === item
                                            ? "text-white"
                                            : prevSection === item
                                            ? "text-yellow-400"
                                            : "text-cyan-400"
                                    }`}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <a
                                        href={`#${item}`}
                                        onClick={() => {
                                            toggleMenu();
                                            setActiveSection(item);
                                        }}
                                    >
                                        {item.charAt(0).toUpperCase() + item.slice(1)}
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
