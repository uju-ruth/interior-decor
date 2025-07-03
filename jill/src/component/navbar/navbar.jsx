import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Logo from "../../assets/logo/Logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Navigation items for better maintainability
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: 'about' },
    { label: 'Services', href: 'services' }
  ];

  return (
    <>
      {/* Main Navigation */}
      <nav 
        className="fixed top-1 left-0 right-0 bg-white shadow-md z-50 rounded-4xl"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Desktop Navigation - Left */}
            <div className="hidden lg:block">
              <ul className="flex space-x-8">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-gray-700 hover:text-[#054846] font-medium transition-colors duration-200 relative group"
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#054846] transition-all duration-200 group-hover:w-full"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Logo - Center */}
            <div className="flex items-center space-x-3">
              <img 
                src={Logo} 
                alt="Jill's Interior Design Logo" 
                className="w-9 h-9 rounded-sm"
              />
              <h1 className="text-lg font-bold text-[#054846]">
                Jill's Interior Design
              </h1>
            </div>

            {/* Desktop CTA & Mobile Menu Button - Right */}
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 text-gray-700 hover:text-[#054846] transition-colors"
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
              >
                <FontAwesomeIcon 
                  icon={isMenuOpen ? faXmark : faBars} 
                  className="w-5 h-5"
                />
              </button>

              {/* Desktop CTA Button */}
              <a href="/contact" className="block">
              <button className="hidden md:block px-6 py-2 text-white bg-[#054846] hover:bg-[#043634] rounded-full transition-colors duration-200 font-medium">
                chat with us
              </button>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white border-t border-gray-100 px-4 py-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className="block px-4 py-3 text-gray-700 hover:text-[#054846] hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Mobile CTA Button */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <button 
                onClick={closeMenu}
                className="w-full px-4 py-4 text-white bg-[#054846] hover:bg-[#043634] rounded-full transition-colors duration-200 font-medium"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </nav>
      
    </>
  );
};

export default Navbar;