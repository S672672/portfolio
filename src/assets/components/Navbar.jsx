import React from 'react';

export default function Navbar () {
    return(
  <nav className="bg-gray-800 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold">Smith Bhattarai</h1>
      <ul className="flex space-x-4">
        <li className="text-gray-300 hover:text-white"><a href="#home">Home</a></li>
        <li className="text-gray-300 hover:text-white"><a href="#about">About</a></li>
        <li className="text-gray-300 hover:text-white"><a href="#projects">Projects</a></li>
        <li className="text-gray-300 hover:text-white"><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </nav>
);
}
