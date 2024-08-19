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
                { title: 'Project 1', description: 'A cool project...', image: '/path/to/image1.jpg' },
                { title: 'Project 2', description: 'Another cool project...', image: '/path/to/image2.jpg' }
            ]} />
            <Contact />
            <SocialMedia links={socialLinks} />
        </>
    );
}

