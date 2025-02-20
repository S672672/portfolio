import React, { useEffect } from "react";
import gif3 from "../pictures/comp.png";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {
  useEffect(() => {
    const alphabets = document.getElementsByClassName("hero__alphabet");
    for (let i = 0; i < alphabets.length; i++) {
      alphabets[i]?.addEventListener("animationend", function () {
        alphabets[i].classList.remove("alphabet-animated");
      });

      alphabets[i]?.addEventListener("mouseover", function () {
        alphabets[i].classList.add("alphabet-animated");
      });
    }
    
    // Initialize AOS
    AOS.init({
      duration: 2000,
      easing: 'ease-out-back',
      once: true,
    });
  }, []);

  return (
    <section id="home">
    <div className="relative bg-black overflow-hidden min-h-screen flex flex-col md:flex-row justify-between items-center px-6 md:px-16 py-12 pt-16 font-lato font-bold">
      <div className="absolute left-4 md:left-10 top-1/3 bottom-1/4 w-[4px] bg-gradient-to-b from-cyan-400 to-cyan-900 opacity-50 hidden md:block">
        <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded-full"></span>
      </div>
    
      <div className="text-white relative z-20 max-w-3xl text-start md:text-left mt-16" data-aos="fade-up">
      <p className="flex flex-wrap items-center justify-start md:justify-start uppercase text-lg font-light">
  Namaste, I am <b className="ml-1 text-cyan-400">Smith Bhattarai</b>
</p>

<p className="font-bold text-4xl md:text-6xl uppercase tracking-wide mt-4 text-start">
  {[...'SOFTWARE'].map((char, index) => (
    <span key={index} className="text-cyan-400 inline-block hero__alphabet transition-transform duration-300 hover:scale-125 animate-bounce delay-200" style={{ animationDelay: `${200 * (index + 1)}ms` }}>
      {char}
    </span>
  ))}
  <span className="text-white  block md:inline animate-pulse"> Engineer</span>
</p>

<p className="text-lg font-light mt-6 max-w-lg mx-auto md:mx-0 leading-relaxed animate-slideIn text-start" data-aos="fade-up" data-aos-delay="200">
  Innovating through software to make a difference.
</p>

    
        <div className="mt-8 flex flex-wrap justify-start md:justify-start gap-4">
          <a className="px-6 py-3 bg-cyan-400 text-black font-medium border border-cyan-400 hover:bg-transparent hover:border-cyan-400 hover:text-white transition shadow-md animate-wiggle" href="#about" data-aos="fade-up" data-aos-delay="400">
            Read more
          </a>
          <a className="px-6 py-3 border border-cyan-400 text-white hover:bg-cyan-400 hover:text-black hover:font-medium hover:border-cyan-400 transition shadow-md animate-jump" href="#contact" data-aos="fade-up" data-aos-delay="600">
            Contact me
          </a>
        </div>
      </div>
    
      <div
  className="absolute right-0 top-1/4 w-1/2 md:static md:w-1/2 z-0 pointer-events-none"
  data-aos="zoom-in"
  data-aos-delay="800"
>
<img
  src={gif3}
  alt="Image"
  className="w-full h-auto object-cover animate-fadeIn opacity-40"
  style={{ mixBlendMode: "overlay" }}
/>

</div>


    
      <style>
        {`
          @keyframes alphabetAnimation {
            0%, 16%, 25% { transform: scale(1.2, 0.5); }
            32% { transform: scale(0.8, 1.1); }
            48% { transform: scale(0.95, 1); }
            64% { transform: scale(0.8, 1.2); }
            80%, 87% { transform: scale(1.15, 1); }
            90% { transform: scale(0.8, 1); }
            95% { transform: scale(1.05, 1); }
            100% { transform: scale(1, 1); }
          }

          .alphabet-animated {
            color: #ff6347;
            animation: alphabetAnimation 0.7s ease-in-out 1;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideIn {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          @keyframes wiggle {
            0%, 100% { transform: rotate(0); }
            50% { transform: rotate(5deg); }
          }

          @keyframes jump {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
    </div>
    </section>
  );
};

export default Hero;
