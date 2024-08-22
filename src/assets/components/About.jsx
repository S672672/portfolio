import React from 'react';

export default function About() {
    return (
        <section id="about" className="py-20 bg-gray-100">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
                <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
                    <div className="lg:w-1/3 text-center">
                        <img src= '/smith.png' alt="Profile" className="rounded-full w-48 h-48 mx-auto mb-6" type="image/png" />
                        <h3 className="text-2xl font-semibold">Smith Bhattarai</h3>
                        <p className="text-gray-600">Software Engineer</p>
                    </div>
                    <div className="lg:w-2/3 text-left">
                        <p className="text-lg text-gray-700 mb-6">
                            I am a software engineer with a passion for building impactful digital solutions. With a background in both front-end and back-end development, I bring a comprehensive approach to web development. I love tackling challenges and continuously learning new technologies to improve my craft.
                        </p>
                        <div className="flex flex-col flex-wrap justify-center">
                            <div className="text-center p-4">
                                <h4 className="text-3xl font-bold text-secondary text-blue-400">Fresher</h4>
                                <p className="text-gray-600">Years of Experience</p>
                            </div>
                            <div className="text-center p-4">
                                <h4 className="text-3xl font-bold text-secondary text-blue-400">20+</h4>
                                <p className="text-gray-600">Completed Projects</p>
                            </div>
                            {/* <div className="text-center p-4">
                                <h4 className="text-3xl font-bold text-secondary text-blue-400">2</h4>
                                <p className="text-gray-600">Programming Languages</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

