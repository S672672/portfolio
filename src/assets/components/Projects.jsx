import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Projects({ projects }) {
      useEffect(() => {
        AOS.init({
          duration: 1000,
          easing: 'ease-out-back',
          once: false, 
          offset: 100, 
        });
      }, []);
    return (
        <section id="projects" className="pt-20 pb-10 bg-black min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-6 max-w-screen-sm sm:max-w-screen-md lg:max-w-screen-lg" data-aos="fade-up">
                <h2 className="text-4xl font-bold text-center mb-12 text-white underline " data-aos="fade-up">PROJECTS</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                    {projects.map((project, index) => (
                        <TiltCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function TiltCard({ project, index }) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(() => {
                setTilt({ x: Math.sin(Date.now() / 500) * 5, y: Math.cos(Date.now() / 500) * 5 });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [isHovered]);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width - 0.5) * 60; 
        const y = ((e.clientY - top) / height - 0.5) * 60; 
        setTilt({ x: -x, y: -y }); 
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
    };

    return (
        <div 
            className="border border-2 border-cyan-900 relative bg-opacity-75 m-4 overflow-hidden shadow-lg transition-transform duration-300 cursor-pointer transition-all duration-300 bg-transparent text-white border-indigo-400 shadow-[0_0_15px_rgba(0,255,255,0.6)] hover:scale-105"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.05)`,
                transition: 'transform 0.2s ease-out',
            }}
        >
            <img src={project.image} alt={project.title} className="w-full h-48 object-cover" type="image/png" />
            <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-blue-500">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex items-center justify-between gap-1">
                <a
                    href={project.linkk}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-3 mt-4 text-black font-medium bg-cyan-400 border-2 border-transparent transition-all duration-300 hover:bg-transparent hover:text-white hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,255,255,0.6)] hover:scale-105"
                >
                    View Project
                </a>
                {project.Live &&  <a
                    href={project.Live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-3 mt-4 text-black font-medium bg-purple-400 border-2 border-transparent transition-all duration-300 hover:bg-transparent hover:text-white hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,255,255,0.6)] hover:scale-105"
                >
                    view live
                </a>}
                </div>
            </div>
        </div>
    );
}
