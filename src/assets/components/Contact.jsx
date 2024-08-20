import React from 'react';
import emailjs from 'emailjs-com';

export default function Contact() {

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_5p94hoi", "template_dvbvovi", e.target, "6yPpb9KyXGH9b0z4z")
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });

    // Optionally reset the form after submission
    e.target.reset();
  };

  return (
    <section id="contact" className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
        <form className="max-w-lg mx-auto" onSubmit={sendEmail}>
          <div className="mb-4">
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none" 
              required 
            />
          </div>
          <div className="mb-4">
            <input 
              type="email" 
              name="email"
              placeholder="Your Email" 
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none" 
              required 
            />
          </div>
          <div className="mb-4">
            <textarea 
              name="message" 
              placeholder="Your Message" 
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none h-32" 
              required
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
