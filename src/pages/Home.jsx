import React from 'react';
import Navbar from '../assets/components/Navbar';
import Contact from '../assets/components/Contact';
import Hero from '../assets/components/Hero';
import Projects from '../assets/components/Projects';
import About from '../assets/components/About';
import Skills from '../assets/components/Skills';
import SocialMedia from '../assets/components/SocialMedia';
import expensetrackerimg from './expensetracker.png'
import ipaddresstrackerimg from './ipaddresstracker.png'

export default function Home() {
    const socialLinks = {
        //facebook: "https://facebook.com/your-profile",
        linkedin: "https://www.linkedin.com/in/smith-b-40160a25a/",
        twitter: "https://x.com/RedHorseAatman1?t=KDk5-1q7JBusyn2cKJc3HA&s=09",
        instagram: "https://instagram.com/ees_meeth",
        github: "https://github.com/s672672",
      };
    return (
        <>
            <Navbar />
            <Hero title="Welcome, I’m Smith Bhattarai" subtitle="Innovating through software to make a difference." buttonText="View Projects" />
            <About />
            <Skills skills={['JavaScript','Python','React', 'Node.js', 'Tailwind CSS', 'Express.js', 'MongoDB']} />
            <Projects projects={[
                { title: 'Expense Tracker', description: 'It is a web application in which users can track all the expenses and can manage their expenses accordingly', image: `${expensetrackerimg}`,linkk:'https://github.com/S672672/Expense-Tracker' },
                { title: 'Ip address tracker', description: 'It is a web application which can track the location through the ip address', image: `${ipaddresstrackerimg}`,linkk:'https://github.com/S672672/IpAddressTracker-using-react' }
            ]} />
            <Contact />
            <SocialMedia links={socialLinks} />
        </>
    );
}

