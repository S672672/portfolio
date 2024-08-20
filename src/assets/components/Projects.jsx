import React from 'react';

export default function Projects({ projects }) {
    return (
        <section id="projects" className="py-20 bg-white cursor-pointer">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                            <img src={project.image} alt={project.title} className="w-full h-48 object-cover" type="image/png" />
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-2 text-blue-700">{project.title}</h3>
                                <p className="text-gray-600 mb-4">{project.description}</p>
                                <a href={project.linkk} target="_blank" rel="noopener noreferrer" className="text-secondary font-bold hover:underline hover:text-blue-400">
                                    View Project
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
