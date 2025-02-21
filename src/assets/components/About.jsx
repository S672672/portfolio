import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faLinkedinIn} from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import React, { useState, useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function About() {
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-back',
      once: false,
      offset: 100,
    });
    const handleScrollOrResize = () => {
      AOS.refresh();
    };
    window.addEventListener("scroll", handleScrollOrResize);
    window.addEventListener("resize", handleScrollOrResize);
    return () => {
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, []);
  
  const experience = [
    // {
    //   title: "",
    //   company: "",
    //   date: "",
    //   description: "",
    //   icon: "👨‍💻",
    // },
    {
      title: "Software Engineer Intern",
      company: "Ellite Solutions",
      date: "2024",
      description: 
      "- Assisted in software development, debugging, and testing to support project delivery.\n- Collaborated with teams to optimize system performance and resolve technical issues.",
      icon: "👨‍💻",
    },
  ];

  const aboutDetails = [
    {
      title: "What i do?",
      description: "I focus on building efficient applications, solving complex problems, and delivering high-quality solutions through collaboration and continuous learning.",
      icon: "💻",
    },
    // {
    //   title: "Cloud Computing Enthusiast",
    //   description: "Familiar with AWS, Azure, and cloud-based infrastructure solutions.",
    //   icon: "☁️",
    // },
    // {
    //   title: "Automation Expert",
    //   description: "Passionate about automating workflows and optimizing processes.",
    //   icon: "⚙️",
    // },
  ];

  return (
    <section id="about" className="py-20 bg-black w-full text-white">
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="text-5xl font-bold text-white mb-10 underline" data-aos="fade-up">WHO AM I?</div>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold transition-all duration-300 mb-10" data-aos="fade-up">
          </h2>

          <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-12">
            <div className="lg:w-1/3 text-center relative flex flex-col items-center">
              <img
                src="/smithimg.jpeg"
                alt="Profile"
                className="relative rounded-full w-48 h-48 object-cover border-transparent shadow-[0_0_25px_5px_rgba(0,255,255,0.6)]"
                data-aos="zoom-in"
              />
              <h3 className="text-3xl font-bold text-white mt-4" data-aos="fade-up">Smith Bhattarai</h3>
              <p className="text-cyan-400 text-2xl" data-aos="fade-up">Software Engineer</p>
              <div className="flex justify-center space-x-4 mt-6">
                <button className={`px-3 py-3 ${activeTab === "about" ? "bg-cyan-400 text-black" : "bg-black text-white border border-cyan-400"} font-medium shadow-lg transition transform hover:scale-105`} onClick={() => setActiveTab("about")}>
                  About Me
                </button>
                <button className={`px-3 py-3 ${activeTab === "experience" ? "bg-cyan-400 text-black" : "bg-black text-white border border-cyan-400"} font-medium shadow-lg transition transform hover:scale-105`} onClick={() => setActiveTab("experience")}>
                  Experience
                </button>
              </div>
              <div className="flex justify-center space-x-4 mt-2">
              <a href="https://github.com/S672672?tab=repositories" target="_blank" rel="noopener noreferrer" className="mt-4 px-1 py-1 bg-black text-white flex items-center space-x-1 border border-cyan-400 hover:bg-cyan-400 hover:text-black shadow-lg transition transform hover:scale-105" data-aos="fade-up">
                <FontAwesomeIcon icon={faGithub} size="sm" />
                <span className="text-xs">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/smith-bhattarai" target="_blank" rel="noopener noreferrer" className="mt-4 px-1 py-1 bg-black text-white flex items-center space-x-1 border border-cyan-400 hover:bg-cyan-400 hover:text-black shadow-lg transition transform hover:scale-105" data-aos="fade-up">
                <FontAwesomeIcon icon={faLinkedinIn} size="sm" />
                <span className="text-xs">LinkedIn</span>
              </a>
              </div>
            </div>

            <div className="lg:w-2/3 text-left mt-10 lg:pl-12 relative hidden lg:block">
              <div className="max-w-3xl mx-auto relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 border border-white border-4" />
                {(activeTab === "about" ? aboutDetails : experience).map((item, index) => (
                  <div key={index} className="relative flex items-center">
                    {index % 2 === 0 && (
                      <div className="w-1/2 pr-5 mr-4">
                        <div className="bg-transparent p-6 shadow-lg mr-2  border-transparent shadow-card" data-aos="fade-left">
                          <h2 className="text-xl font-bold">{item.title}</h2>
                          {item.company && <h1 className="text-orange-400 font-bold">🏢 {item.company}</h1>}
                          {item.date && <p className="text-cyan-400 font-semibold text-lg">({item.date})</p>}
                          <p className="text-gray-300 whitespace-pre-line">{item.description}</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                      <div className="bg-white rounded-full p-2 shadow-lg z-10">
                        <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center">
                          <span className="text-xl">{item.icon}</span>
                        </div>
                      </div>
                    </div>
                    {index % 2 === 1 && (
                      <div className="w-1/2 pl-7 ml-auto">
                        <div className="bg-transparent p-6 shadow-lg  border-transparent shadow-card" data-aos="fade-right">
                          <h2 className="text-xl font-bold">{item.title}</h2>
                          {item.company && <h1 className="text-orange-400 font-bold">🏢 {item.company}</h1>}
                          {item.date && <p className="text-cyan-400 font-semibold text-lg">({item.date})</p>}
                          <p className="text-gray-300 whitespace-pre-line">{item.description}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-10 lg:hidden">
              <div className="absolute left-5 top-0 h-full w-0.5 bg-white border border-white"></div>

              {(activeTab === "about" ? aboutDetails : experience).map((item, index) => (
                <div key={index} className="relative flex items-center space-x-4 mb-6" data-aos="fade-up">
                  <div className="w-10 flex-shrink-0 flex justify-center">
                    <div className="bg-white rounded-full p-2 shadow-lg z-10">
                      <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center">
                        <span className="text-xl">{item.icon}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-transparent  border-transparent shadow-card p-3 shadow-lg text-left flex-1 ml-4">
                    <h2 className="text-xl font-bold">{item.title}</h2>
                    {item.company && <h1 className="text-orange-400 font-bold">🏢 {item.company}</h1>}
                    {item.date && <p className="text-cyan-400 text-sm">({item.date})</p>}
                    <p className="text-gray-300 whitespace-pre-line">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
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
          </div>
        </div>
      </div>
    </section>
  );
}
