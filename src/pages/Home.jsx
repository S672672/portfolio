import { React, useEffect } from "react";
import Navbar from "../assets/components/Navbar";
import Contact from "../assets/components/Contact";
import Hero from "../assets/components/Hero";
import Projects from "../assets/components/Projects";
import About from "../assets/components/About";
import Skills from "../assets/components/Skills";
import SocialMedia from "../assets/components/SocialMedia";
import Creation from "../assets/components/Creation";
import Viewall from "../assets/components/ViewAll";
import AOS from "aos";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 2000, // Default duration for animations
      easing: "ease-out-back", // You can tweak the easing function here
      once: true, // Trigger the animation only once
    });
  }, []);

  const socialLinks = {
      github: "https://github.com/S672672",
    linkedin: "https://www.linkedin.com/in/smith-6b92b638a/",
    facebook: "https://www.facebook.com/profile.php?id=61583339192497",
    twitter: "https://x.com/eysmeeth",
    instagram: "https://instagram.com/smith.bhattarai.12",
  };
  return (
    <>
      <Navbar />
      <div>
        <Hero />
        <About />
        <Skills
          skills={[
            "JavaScript",
            "TypeScript",
            "Python",
            "React",
            "Next.js",
            "Node.js",
            "Tailwind CSS",
            "Express.js",
            "MongoDB",
            "git",
            "github",
            "mySQL",
          ]}
        />
        <Projects
          projects={[
            {
              title: "Ip address tracker",
              description:
                "A web application that pinpoints geographical locations based on IP addresses, built to demonstrate mastery of APIs and geolocation services",
              image: "./ipaddresstracker.png",
              linkk: "https://github.com/S672672/IpAddressTracker-using-react",
              Live: "https://trackaddress.netlify.app/",
            },
            {
              title: "PlayeTube",
              description:
                "A video playing application created using nextjs to watch videos",
              image: "./playetube.png",
              linkk: "https://github.com/S672672/playtube",
              Live: "https://playetubee.netlify.app/",
            },
            {
              title: "spend sense",
              description:
                "A comprehensive web application enabling users to track and manage their expenses effectively. Designed with user-friendly features for seamless financial oversight.",
              image: "./expensetracker.png",
              linkk: "https://github.com/S672672/Expense-Tracker",
            },
            // {title:'Chess Game' ,description:'A personal project for practicing complex logic, resulting in a functional chess game. Though not perfect, it showcases problem-solving skills in game development.',image:'./chess.jpeg',linkk:'https://github.com/S672672/Let-s-play-chess'},
            // {title:'youtube video downloader' ,description:'A web application that allows users to download YouTube videos in various qualities, with the highest available quality set as default. Highlights expertise in working with media data processing.',image:'./youtube.png',linkk:'https://github.com/S672672/YouTube-video-downloader-'},
            // {title:'Dictionary' ,description:'A modern dictionary app that stands out with its unique output format, showcasing an innovative approach to data presentation.',image:'./dict.png',linkk:'https://github.com/S672672/Dictionary-using-react'},
            {
              title: "Hamro Mart",
              description:
                "A web application for grocery mart, helping to track stock availability efficiently. Built to streamline the operational workflow.",
              image: "./inventory.png",
              linkk: "https://github.com/S672672/Inventory_tracking",
            },
            {
              title: "Pet Adoption",
              description:
                "A full-stack MERN application for pet adoption, allowing users to give away or adopt pets with profile submissions, including photos and descriptions. Features secure authentication, easy request management, form validation, and photo uploads for a smooth user experience.",
              image: "./PetAdopt.png",
              link: "https://github.com/S672672/PVVVI.git",
            },
            {
              title: "NetVerge",
              description:
                "A browser-based network infrastructure planning and analysis platform for designing topologies, detecting architectural risks, simulating device failures, and evaluating network resilience, security, and capacity. Built with a local-first architecture using IndexedDB for private project persistence without requiring a backend or database.",
              image: "./NetVerge.png",
              link: "https://github.com/S672672/NetVerge.git",
            },
          ]}
        />
        <Viewall />
        <Contact />
        <SocialMedia links={socialLinks} />
        <Creation />
      </div>
    </>
  );
}
