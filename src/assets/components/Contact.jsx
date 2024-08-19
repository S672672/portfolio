import React from 'react';

export default function Contact() {
    return (
        <section id="contact" className="py-16 bg-gray-800 text-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
                <form className="max-w-lg mx-auto">
                    <div className="mb-4">
                        <input type="text" placeholder="Your Name" className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none" />
                    </div>
                    <div className="mb-4">
                        <input type="email" placeholder="Your Email" className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none" />
                    </div>
                    <div className="mb-4">
                        <textarea placeholder="Your Message" className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none h-32"></textarea>
                    </div>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full">Send Message</button>
                </form>
            </div>
        </section>
    );
}