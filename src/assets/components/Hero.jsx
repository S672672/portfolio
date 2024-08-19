import React from 'react';

export default function Hero({ title, subtitle, buttonText }) {
    return (
        <section id="home" className="bg-cover bg-center h-screen text-white flex items-center justify-center" style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}>
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">{title}</h1>
                <p className="text-xl mb-8">{subtitle}</p>
                <a href="#projects" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full">{buttonText}</a>
            </div>
        </section>
    );
}
