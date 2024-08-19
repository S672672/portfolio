import React from 'react';

export default function Skills({ skills }) {
    return (
        <section id="skills" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12">My Skills</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {skills.map((skill, index) => (
                        <div key={index} className="bg-blue-200 px-4 py-6 rounded-lg shadow-md text-center">
                            <span className="text-xl font-semibold">{skill}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

