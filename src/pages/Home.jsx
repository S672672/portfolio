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
            <Skills skills={['JavaScript','Python','React', 'Node.js', 'Tailwind CSS', 'Express.js', 'MongoDB']} />
            <Projects projects={[
                { title: 'Expense Tracker', description: 'It is a web application in which users can track all the expenses and can manage their expenses accordingly', image: './expensetracker.png',linkk:'https://github.com/S672672/Expense-Tracker' },
                { title: 'Ip address tracker', description: 'It is a web application which can track the location through the ip address', image: './ipaddresstracker.png',linkk:'https://github.com/S672672/IpAddressTracker-using-react' },
                {title:'Chess Game' ,description:'It is a chess game which i built for my practice,although it is not perfect but learnt so much from it',image:'./chess.jpeg',linkk:'https://github.com/S672672/Let-s-play-chess'},
                {title:'youtube video downloader' ,description:'A youtube video downloader web app.It has a feature of downloading videos in different quality.It will use the highest quality as default.',image:'./youtube.png',linkk:'https://github.com/S672672/YouTube-video-downloader-'},
                {title:'Dictionary' ,description:'It is a dictionary app.It is a bit different from others in output type.',image:'./dict.png',linkk:'https://github.com/S672672/Dictionary-using-react'},
                {title:'Inventory Tracking' ,description:'It is a web app for a mart in which we can track the available items in the mart.',image:'./inventory.png',linkk:'https://github.com/S672672/Inventory_tracking'},
            ]} />
            <Viewall />
            <Contact />
            <SocialMedia links={socialLinks} />
            <Creation />
        </>
    );
}

