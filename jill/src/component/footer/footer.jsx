import React from "react";
import { ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import Logo from "../../assets/logo/Logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#00403C] text-white">
      {/* Main Footer Content */}
      <div className="px-6 md:px-16 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Top Section - CTA */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16 pb-16 border-b border-white/10">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
                Ready To Build Your <br />
                <span className="text-[#FFF6D6]">Dream Project?</span>
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mb-8">
                Transform your vision into reality with our expert architectural
                and interior design services.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/contact" className="block">
                <button className="bg-[#FFF6D6] text-black font-semibold px-8 py-4 rounded-full inline-flex items-center gap-2 hover:bg-yellow-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  Get in touch <ArrowUpRight size={20} />
                </button>
              </a>
              <a href="/portfolio" className="block">
                <button className="border-2 border-white/30 text-white font-medium px-8 py-4 rounded-full hover:border-[#FFF6D6] hover:bg-[#FFF6D6]/10 transition-all duration-300">
                  View Portfolio
                </button>
              </a>
            </div>
          </div>

          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Brand Section */}
            <div className="lg:col-span-5">
              {/* Logo and Brand */}
              <div className="flex items-center gap-4 mb-6">
                <img src={Logo} alt="Nextspace" className="w-14 h-14" />
                <div>
                  <span className="text-3xl font-bold text-white">
                    Nextspace
                  </span>
                  <p className="text-[#FFF6D6] text-sm font-medium">
                    Architecture & Design
                  </p>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md">
                Develops conceptual design ideas, refines them into detailed
                plans, and brings extraordinary architectural visions to life.
              </p>

              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300">
                  <div className="p-2 bg-[#FFF6D6]/20 rounded-lg">
                    <MapPin size={18} className="text-[#FFF6D6]" />
                  </div>
                  <div>
                    <h5 className="text-white font-medium mb-1">
                      Visit Our Office
                    </h5>
                    <p className="text-gray-300 text-sm">
                      70 University Ave Palo
                    </p>
                    <p className="text-gray-300 text-sm">Alto, CA 94301</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300">
                  <div className="p-2 bg-[#FFF6D6]/20 rounded-lg">
                    <Phone size={18} className="text-[#FFF6D6]" />
                  </div>
                  <div>
                    <h5 className="text-white font-medium mb-1">Call Us</h5>
                    <a
                      href="tel:6506711706"
                      className="text-gray-300 text-sm hover:text-[#FFF6D6] transition-colors duration-200"
                    >
                      650.671.1706
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-300">
                  <div className="p-2 bg-[#FFF6D6]/20 rounded-lg">
                    <Mail size={18} className="text-[#FFF6D6]" />
                  </div>
                  <div>
                    <h5 className="text-white font-medium mb-1">Email Us</h5>
                    <a
                      href="mailto:hello@dvlpmedicines.com"
                      className="text-gray-300 text-sm hover:text-[#FFF6D6] transition-colors duration-200"
                    >
                      hello@dvlpmedicines.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-6">
                    Company
                  </h4>
                  <ul className="space-y-4">
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-[#FFF6D6] transition-colors duration-200 text-sm flex items-center group"
                      >
                        Projects
                        <ArrowUpRight
                          size={14}
                          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-[#FFF6D6] transition-colors duration-200 text-sm flex items-center group"
                      >
                        About
                        <ArrowUpRight
                          size={14}
                          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-[#FFF6D6] transition-colors duration-200 text-sm flex items-center group"
                      >
                        Contact
                        <ArrowUpRight
                          size={14}
                          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-[#FFF6D6] transition-colors duration-200 text-sm flex items-center group"
                      >
                        Career
                        <ArrowUpRight
                          size={14}
                          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        />
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-6">
                    Resources
                  </h4>
                  <ul className="space-y-4">
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-[#FFF6D6] transition-colors duration-200 text-sm flex items-center group"
                      >
                        FAQ
                        <ArrowUpRight
                          size={14}
                          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-[#FFF6D6] transition-colors duration-200 text-sm flex items-center group"
                      >
                        Terms & Conditions
                        <ArrowUpRight
                          size={14}
                          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-[#FFF6D6] transition-colors duration-200 text-sm flex items-center group"
                      >
                        Privacy Policy
                        <ArrowUpRight
                          size={14}
                          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-[#FFF6D6] transition-colors duration-200 text-sm flex items-center group"
                      >
                        License
                        <ArrowUpRight
                          size={14}
                          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="lg:col-span-3">
              <h4 className="text-white font-semibold text-lg mb-6">
                Follow Us
              </h4>
              <div className="space-y-4">
                <a
                  href="#"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-[#FFF6D6]/20 rounded-lg flex items-center justify-center group-hover:bg-[#FFF6D6]/30 transition-colors duration-300">
                    <span className="text-[#FFF6D6] font-semibold text-sm">
                      D
                    </span>
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                    Discord
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="ml-auto text-gray-400 group-hover:text-[#FFF6D6] transition-colors duration-200"
                  />
                </a>

                <a
                  href="#"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-[#FFF6D6]/20 rounded-lg flex items-center justify-center group-hover:bg-[#FFF6D6]/30 transition-colors duration-300">
                    <span className="text-[#FFF6D6] font-semibold text-sm">
                      T
                    </span>
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                    Twitter
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="ml-auto text-gray-400 group-hover:text-[#FFF6D6] transition-colors duration-200"
                  />
                </a>

                <a
                  href="#"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-[#FFF6D6]/20 rounded-lg flex items-center justify-center group-hover:bg-[#FFF6D6]/30 transition-colors duration-300">
                    <span className="text-[#FFF6D6] font-semibold text-sm">
                      in
                    </span>
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                    LinkedIn
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="ml-auto text-gray-400 group-hover:text-[#FFF6D6] transition-colors duration-200"
                  />
                </a>
              </div>

              {/* Newsletter Signup */}
              <div className="mt-8 p-6 bg-white/5 rounded-xl">
                <h5 className="text-white font-medium mb-3">Stay Updated</h5>
                <p className="text-gray-300 text-sm mb-4">
                  Get the latest updates on our projects and design insights.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#FFF6D6] transition-colors duration-200"
                  />
                  <button className="px-4 py-2 bg-[#FFF6D6] text-black rounded-lg hover:bg-yellow-100 transition-colors duration-200">
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 px-6 md:px-16 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 Nextspace. All rights reserved. Crafted with passion for
            exceptional design.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-gray-400 hover:text-[#FFF6D6] text-sm transition-colors duration-200"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#FFF6D6] text-sm transition-colors duration-200"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#FFF6D6] text-sm transition-colors duration-200"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
