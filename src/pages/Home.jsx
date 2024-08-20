import React from 'react';
import Navbar from '../assets/components/Navbar';
import Contact from '../assets/components/Contact';
import Hero from '../assets/components/Hero';
import Projects from '../assets/components/Projects';
import About from '../assets/components/About';
import Skills from '../assets/components/Skills';
import SocialMedia from '../assets/components/SocialMedia';

export default function Home() {
    const socialLinks = {
        //facebook: "https://facebook.com/your-profile",
        linkedin: "www.linkedin.com/in/smith-b-40160a25a",
        twitter: "https://x.com/RedHorseAatman1?t=KDk5-1q7JBusyn2cKJc3HA&s=09",
        instagram: "https://instagram.com/ees_meeth",
        github: "https://github.com/s672672",
      };
    return (
        <>
            <Navbar />
            <About />
            <Skills skills={['JavaScript','Python','React', 'Node.js', 'Tailwind CSS', 'Express.js', 'MongoDB']} />
            <Hero title="Hello, I'm Smith Bhattarai" subtitle="A Software Engineer" buttonText="View Projects" />
            <Projects projects={[
                { title: 'Expense Tracker', description: 'It is a web application in which users can track all the expenses and can manage their expenses accordingly', image: './src/assets/Pictures/expensetracker.png',linkk:'https://github.com/S672672/Expense-Tracker' },
                { title: 'Ip address tracker', description: 'It is a web application which can track the location through the ip address', image: './src/assets/Pictures/ipaddresstracker.png',linkk:'https://github.com/S672672/IpAddressTracker-using-react' }
            ]} />
            <Contact />
            <SocialMedia links={socialLinks} />
        </>
    );
}

