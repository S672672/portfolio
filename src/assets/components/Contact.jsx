import React, { useState } from 'react';

export default function Contact() {
  const [result, setResult] = useState("");

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
    <section id="contact" className="py-16 bg-gray-800 text-white min-h-screen flex flex-col justify-between">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
        <form className="max-w-lg mx-auto" onSubmit={onSubmit}>
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
      {result && (
        <div className="bg-white text-black text-center p-4 fixed bottom-0 w-full shadow-lg">
          {result}
        </div>
      )}
    </section>
  );
}
