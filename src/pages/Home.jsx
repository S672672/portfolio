import React from 'react';
import Navbar from '../assets/components/Navbar';
import Contact from '../assets/components/Contact';
import Hero from '../assets/components/Hero';
import Projects from '../assets/components/Projects';
import About from '../assets/components/About';
import Skills from '../assets/components/Skills';
import SocialMedia from '../assets/components/SocialMedia';
import Creation from '../assets/components/Creation';
import Viewall from '../assets/components/ViewAll';

export default function Home() {
    const socialLinks = {
        facebook: "https://www.facebook.com/profile.php?id=100077372552139",
        linkedin: "https://www.linkedin.com/in/smith-b-40160a25a/",
        twitter: "https://x.com/RedHorseAatman1?t=KDk5-1q7JBusyn2cKJc3HA&s=09",
        instagram: "https://instagram.com/ees_meeth",
        github: "https://github.com/s672672",
      };
    return (
        <>
            <Navbar />
            <Hero title="Namaste, I’m Smith Bhattarai" subtitle="Innovating through software to make a difference." buttonText="View Projects" />
            <About />
            <Skills skills={['JavaScript','Python','React', 'Node.js', 'Tailwind CSS', 'Express.js', 'MongoDB','git','github']} />
            <Projects projects={[
                { title: 'spend sense', description: 'A comprehensive web application enabling users to track and manage their expenses effectively. Designed with user-friendly features for seamless financial oversight.', image: './expensetracker.png',linkk:'https://github.com/S672672/Expense-Tracker' },
                { title: 'Ip address tracker', description: ' A web application that pinpoints geographical locations based on IP addresses, built to demonstrate mastery of APIs and geolocation services', image: './ipaddresstracker.png',linkk:'https://github.com/S672672/IpAddressTracker-using-react' },
                {title:'Chess Game' ,description:'A personal project for practicing complex logic, resulting in a functional chess game. Though not perfect, it showcases problem-solving skills in game development.',image:'./chess.jpeg',linkk:'https://github.com/S672672/Let-s-play-chess'},
                {title:'youtube video downloader' ,description:'A web application that allows users to download YouTube videos in various qualities, with the highest available quality set as default. Highlights expertise in working with media data processing.',image:'./youtube.png',linkk:'https://github.com/S672672/YouTube-video-downloader-'},
                {title:'Dictionary' ,description:'A modern dictionary app that stands out with its unique output format, showcasing an innovative approach to data presentation.',image:'./dict.png',linkk:'https://github.com/S672672/Dictionary-using-react'},
                {title:'Inventory Tracking' ,description:'A web application for grocery mart inventory management, helping to track stock availability efficiently. Built to streamline the operational workflow.',image:'./inventory.png',linkk:'https://github.com/S672672/Inventory_tracking'},
                {title:'Pet Adoption',description:'A full-stack MERN application for pet adoption, allowing users to give away or adopt pets with profile submissions, including photos and descriptions. Features secure authentication, easy request management, form validation, and photo uploads for a smooth user experience.',image:'./PetAdopt.png',link:'https://github.com/S672672/PVVVI.git'}
            ]} />
            <Viewall />
            <Contact />
            <SocialMedia links={socialLinks} />
            <Creation />
        </>
    );
}

