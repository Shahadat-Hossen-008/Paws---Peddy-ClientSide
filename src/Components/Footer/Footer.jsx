import React from "react";
import logo from "../../assets/logo.webp";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa6";
import "./footer.css"
function Footer() {
  return (
    <footer className="footer-bg  text-neutral-content p-10">
      <div className="w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo Section */}
        <aside className="flex items-center space-x-2 mb-6 md:mb-0">
          <h1 className="md:text-2xl text-emerald-500 font-bold flex font-display">
            Paws & Tails
            <sup>
              <img src={logo} alt="Logo" />
            </sup>
          </h1>
        </aside>

        {/* Social Media Links */}
        <nav>
          <h6 className="text-lg footer-text font-semibold mb-2 text-center md:text-left">
            Follow Us
          </h6>
          <div className="flex footer-text text-lg space-x-4 justify-center md:justify-start">
            {/* Twitter Icon */}
            <a
              href="#"
              className="hover:text-red-500 transition duration-300"
            >
              <FaYoutube />
            </a>
            {/* YouTube Icon */}
            <a
              href="#"
              className="hover:text-blue-500 transition duration-300"
            >
              <FaLinkedin />
            </a>
            {/* Facebook Icon */}
            <a
              href="#"
              className="hover:text-blue-500 transition duration-300"
            >
              <FaFacebook />
            </a>
          </div>
        </nav>
      </div>

      <div className="text-center mt-6">
        <p className="footer-text">&copy; 2025 Paws & Tails. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
