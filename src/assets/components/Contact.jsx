import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaUser, FaEnvelope, FaComment } from 'react-icons/fa'; 
import gif from "../pictures/giphy3.gif";

export default function Contact() {
  const [result, setResult] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: 'ease-out-back', 
      once: false, 
      offset: 100,
    });
    const handleScroll = () => {
      AOS.refresh();
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...."); 
    const formData = new FormData(event.target);

    formData.append("access_key", "699b226f-b449-4d8a-b6fc-c79959e6e2e1");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully!");
        event.target.reset(); 
      } else {
        setResult("Error: " + data.message);
      }
      setTimeout(() => setResult(""), 3000);
    } catch (error) {
      setResult("An unexpected error occurred. Please try again later.");
      setTimeout(() => setResult(""), 3000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-white underline" data-aos="fade-up">
          GET IN TOUCH
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-2">
          <form
            className="max-w-xl mx-auto p-8 bg-black rounded-xl shadow-xl"
            onSubmit={onSubmit}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="relative">
                <label htmlFor="name" className="text-white font-semibold mb-2 inline-flex items-center">
                  <FaUser className="mr-2 text-cyan-400" /> Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className="w-full px-6 py-4 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300"
                  required
                  data-aos="fade-up"
                  data-aos-delay="200"
                />
              </div>
              <div className="relative">
                <label htmlFor="email" className="text-white font-semibold mb-2 inline-flex items-center">
                  <FaEnvelope className="mr-2 text-cyan-400" /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="w-full px-6 py-4 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300"
                  required
                  data-aos="fade-up"
                  data-aos-delay="300"
                />
              </div>
            </div>

            <div className="relative mb-8">
              <label htmlFor="message" className="text-white font-semibold mb-2 inline-flex items-center">
                <FaComment className="mr-2 text-cyan-400" /> Message
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Message"
                className="w-full px-6 py-4 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300 h-36 resize-none"
                required
                data-aos="fade-up"
                data-aos-delay="400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-cyan-400 text-black font-medium border border-cyan-400 hover:bg-transparent hover:border-cyan-400 hover:text-white transition shadow-md animate-wiggle"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              Send Message
            </button>
          </form>

          <div className="relative w-full md:w-1/2 z-10 flex justify-center mt-8 md:mt-0" data-aos="fade-left">
            <img 
              src={gif} 
              alt="Image" 
              className="w-full md:w-auto" 
              style={{
                mixBlendMode: "overlay"
              }} 
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="fixed bottom-0 w-full bg-gray-800 text-white text-center py-4 shadow-xl">
          <span
            className={`${
              result === "Message sent successfully!"
                ? "bg-green-600"
                : result.includes("Error")
                ? "bg-red-600"
                : "bg-blue-600"
            } text-xl font-semibold rounded-full px-8 py-3 transition-all duration-300`}
          >
            {result}
          </span>
        </div>
      )}
    </section>
  );
}
