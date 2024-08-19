import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn, faTwitter, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';

export default function SocialMedia({ links }) {
    return (
        <div className="flex space-x-4 items-center justify-center h-20 bg-blue-200">
            {/* Facebook */}
            <a href={links.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                <FontAwesomeIcon icon={faFacebookF} size="2x" />
            </a>
            {/* LinkedIn */}
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
                <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
            </a>
            {/* Twitter */}
            <a href={links.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            {/* Instagram */}
            <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            {/* GitHub */}
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black">
                <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
        </div>
    );
}
