import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function About() {
  // const PdfUrl = `./Smith'N Resume.pdf`;
  return (
    <section id="about" className="py-20 bg-gray-100">
    <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
      <div className="flex items-center container mx-auto px-6">
        {/* <h2 className="text-4xl font-bold text-center mb-12">About Me</h2> */}
        <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
          <div className="lg:w-1/3 text-center">
            <img
              src="/smithimg.jpeg"
              alt="Profile"
              className="rounded-full w-48 h-48 mx-auto mb-6 object-cover"
              type="image/png"
            />
            <h3 className="text-3xl font-bold">Smith Bhattarai</h3>
            <p className="text-gray-700 text-2xl">Software Engineer</p>
            {/* <a href={PdfUrl} target="_blank" rel="noopener noreferrer">
              <p className="text-blue-700 underline cursor-pointer text-bold text-xl">
                My Resume
              </p>
            </a> */}
          </div>
          <div className="lg:w-2/3 text-left">
            <p className="text-lg text-gray-700 mb-6">
              I am a software engineer who loves creating useful digital
              solutions. I work on both front-end and back-end development,
              which gives me a complete approach to building websites and webapps.
              I enjoy solving problems and learning new technologies to get
              better at what I do.
            </p>
            <div className="flex flex-col flex-wrap justify-center">
              <div className="text-center p-4">
                <h4 className="text-2xl font-bold text-secondary text-blue-400">
                  Fresher
                </h4>
                <p className="text-gray-600">Years of Experience</p>
              </div>
              <div className="text-center p-4">
                {/* <h4 className="text-3xl font-bold text-secondary text-blue-400">
                  10+
                </h4> */}
                <a
                  href="https://github.com/S672672?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black-600 hover:text-blue-800"
                >
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
                <p className="text-gray-600">Completed Projects</p>
              </div>
              {/* <div className="text-center p-4">
                                <h4 className="text-3xl font-bold text-secondary text-blue-400">2</h4>
                                <p className="text-gray-600">Programming Languages</p>
                            </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
