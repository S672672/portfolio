import React from 'react';
import { FaReact, FaNodeJs, FaJsSquare } from 'react-icons/fa';
import { SiPython, SiTailwindcss, SiExpress, SiMongodb, SiGit, SiGithub, SiTypescript, SiNextdotjs, SiMysql } from 'react-icons/si';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const iconMap = {
    JavaScript: <FaJsSquare />,
    TypeScript: <SiTypescript />,
    Python: <SiPython />,
    mySQL:<SiMysql />,
    'Next.js': <SiNextdotjs />,
    React: <FaReact />,
    'Node.js': <FaNodeJs />,
    'Tailwind CSS': <SiTailwindcss />,
    'Express.js': <SiExpress />,
    MongoDB: <SiMongodb />,
    git: <SiGit />,
    github: <SiGithub />
};

export default function Skills({ skills }) {
    useEffect(() => {
        AOS.init({
          duration: 1000, 
          easing: 'ease-out-back', 
          once: false,
          offset: 100, 
        });
      }, []);
    return (
        <section id="skills" className="py-20 bg-black">
            <div className="container mx-auto px-6 flex justify-center items-center min-h-screen" data-aos="fade-up">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-white mb-12 underline" data-aos="fade-up">MY SKILLS</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {skills.map((skill, index) => (
                            <div key={index} className="min-w-[120px] px-4 py-6 shadow-xl text-center transform transition-all duration-700 ease-in-out hover:scale-105 hover:rotate-2 hover:z-10 relative transition-transform duration-300 cursor-pointer transition-all duration-300 bg-transparent text-white shadow-card">
                                <div className="text-4xl mb-4 text-white transition-all duration-500 ease-in-out hover:scale-110 hover:animate-pulse">
                                    {iconMap[skill] || <span>🚀</span>}
                                </div>
                                <span className="text-xl font-semibold text-white">{skill}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style>
                {`
                    .min-w-[120px] {
                        border: 2px solid transparent;
                        border-radius: 10px;
                        padding: 1rem;
                        position: relative;
                        overflow: hidden;
                        transition: all 0.7s ease-in-out;
                    }

                    .min-w-[120px]:before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-size: 300% 300%;
                        border-radius: 10px;
                        z-index: -1;
                        transition: background 0.5s ease-in-out;
                    }

                    .min-w-[120px]:hover:before {
                        background-position: 100% 100%;
                    }

                    .min-w-[120px]:hover {
                        box-shadow: 0 4px 25px rgba(0, 0, 0, 0.3), 0 6px 30px rgba(0, 0, 0, 0.2);
                        transform: scale(1.1) rotate(3deg);
                        animation: glow 1.5s infinite alternate;
                    }

                    .min-w-[120px]:hover .text-4xl {
                        animation: shine 1s ease-in-out infinite alternate;
                    }

                    @keyframes glow {
                        0% {
                            box-shadow: 0 0 10px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 255, 255, 0.1);
                        }
                        50% {
                            box-shadow: 0 0 30px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.4);
                        }
                        100% {
                            box-shadow: 0 0 10px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 255, 255, 0.1);
                        }
                    }

                    @keyframes shine {
                        0% {
                            transform: scale(1);
                            color: white;
                        }
                        50% {
                            transform: scale(1.15);
                            color: #ffcc00;
                        }
                        100% {
                            transform: scale(1);
                            color: white;
                        }
                    }

                    .min-w-[120px]:hover .text-xl {
                        animation: textPulse 1s ease-in-out infinite alternate;
                    }

                    @keyframes textPulse {
                        0% {
                            transform: scale(1);
                        }
                        50% {
                            transform: scale(1.05);
                            color: #ff6347;
                        }
                        100% {
                            transform: scale(1);
                        }
                    }
                `}
            </style>
            <style>
                {`
                    .shadow-card {
                        border: 2px solid transparent;
                        border-radius: 10px;
                        padding: 1rem;
                        position: relative;
                        overflow: hidden;
                        box-shadow: 0px 10px 30px rgba(0, 255, 255, 0.3); /* Permanent shadow */
                        transition: transform 0.3s ease-in-out;
                    }
                `}
            </style>
        </section>
    );
}
