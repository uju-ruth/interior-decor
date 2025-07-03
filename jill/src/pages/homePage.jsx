import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/navbar/navbar";
import ImageSlider from "../component/imageSlider";
import pic2 from "../assets/images/pic2.jpg";
import Footer from "../component/footer/footer";
import spinner from "../assets/images/spinner.png";

const HomePage = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#054846]/95 backdrop-blur-md shadow-lg border-b border-[#054846]/20">
        <Navbar />
      </header>

      <section
        className="relative bg-cover bg-center bg-no-repeat text-white min-h-screen flex items-center"
        style={{ backgroundImage: `url(${pic2})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        {/* Main Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* LEFT: Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extralight leading-tight tracking-tight">
              Elevating
              <span className="block text-[#54c5c0] font-thin italic">
                Spaces
              </span>
              <span className="block mt-4 text-3xl sm:text-4xl md:text-5xl font-light">
                Crafting Dreams
              </span>
            </h1>

            <p className="mt-6 text-gray-200 text-lg sm:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
              Transforming architectural visions into extraordinary realities
              through
              <span className="text-[#54c5c0] font-medium">
                {" "}
                innovative design
              </span>{" "}
              and
              <span className="text-[#54c5c0] font-medium">
                {" "}
                meticulous craftsmanship
              </span>
              .
            </p>

            <Link
              to="/contact"
              className="mt-8 inline-flex items-center px-8 py-4 bg-[#54c5c0] hover:bg-[#054846] text-[#004643] rounded-full transition-all duration-500 transform hover:scale-110 hover:shadow-xl font-semibold text-lg"
            >
              Book an Appointment
              <svg
                className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {/* RIGHT: Spinning Image */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <img
              src={spinner}
              alt="Spinning Logo"
              className="w-50 h-50 animate-spin"
              style={{ animationDuration: "9s" }} // slower spin
            />
          </div>
        </div>
      </section>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center text-white/70 animate-bounce">
          <span className="text-sm mb-2 tracking-wider">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/70 to-transparent"></div>
        </div>
      </div>

      {/* About Section - Redesigned */}
      <section className="relative w-full py-32 bg-gradient-to-b from-white to-gray-50/50 overflow-hidden">
        {/* Geometric Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#054846]/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#54c5c0]/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-64 bg-gradient-to-b from-transparent via-[#054846]/10 to-transparent rotate-45"></div>
        </div>

        <div className="relative z-10 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Content Side */}
            <div className="space-y-8">
              <div>
                <span className="inline-block px-6 py-3 bg-[#054846]/10 border border-[#054846]/20 rounded-full text-[#054846] text-sm font-semibold mb-6 tracking-wide uppercase">
                  Who We Are
                </span>
                <h2 className="text-[#004643] font-light text-4xl sm:text-5xl lg:text-6xl leading-tight mb-8">
                  Architecture &
                  <br />
                  <span className="text-[#054846] font-normal">
                    Interior Excellence
                  </span>
                </h2>
              </div>

              <div className="space-y-6 text-[#004643]">
                <p className="text-xl leading-relaxed font-light">
                  We are a{" "}
                  <strong className="font-semibold text-[#054846]">
                    premier architectural and interior design firm
                  </strong>{" "}
                  dedicated to creating spaces that inspire and endure. Our
                  approach combines innovative design thinking with meticulous
                  attention to detail.
                </p>

                <p className="text-lg leading-relaxed text-[#004643]/80">
                  Every project we undertake is a journey of collaboration,
                  creativity, and craftsmanship. From conceptual sketches to
                  final execution, we ensure every element reflects our
                  commitment to excellence.
                </p>
              </div>

              <Link
                to="/about"
                className="inline-flex items-center px-8 py-4 bg-[#054846] text-white hover:bg-[#043c3a] rounded-full transition-all duration-300 transform hover:scale-105 font-medium group"
              >
                Learn More About Us
                <svg
                  className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>

            {/* Stats Side */}
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#054846]/10">
                <div className="text-5xl font-extralight text-[#054846] mb-4">
                  150+
                </div>
                <div className="text-sm text-[#004643] uppercase tracking-wider font-medium">
                  Projects Completed
                </div>
              </div>
              <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#054846]/10 mt-8">
                <div className="text-5xl font-extralight text-[#054846] mb-4">
                  10+
                </div>
                <div className="text-sm text-[#004643] uppercase tracking-wider font-medium">
                  Years Experience
                </div>
              </div>
              <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#054846]/10 -mt-8">
                <div className="text-5xl font-extralight text-[#054846] mb-4">
                  98%
                </div>
                <div className="text-sm text-[#004643] uppercase tracking-wider font-medium">
                  Client Satisfaction
                </div>
              </div>
              <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#054846]/10">
                <div className="text-5xl font-extralight text-[#054846] mb-4">
                  24/7
                </div>
                <div className="text-sm text-[#004643] uppercase tracking-wider font-medium">
                  Support Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section - Enhanced */}
      <section className="relative py-32 w-full bg-gradient-to-b from-gray-50 to-white">
        <div className="px-6 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="inline-block px-6 py-3 bg-[#054846]/10 border border-[#054846]/20 rounded-full text-[#054846] text-sm font-semibold mb-8 tracking-wide uppercase">
              Our Work
            </span>
            <h2 className="text-[#004643] font-light text-4xl sm:text-5xl lg:text-6xl mb-8 leading-tight">
              Featured
              <span className="block text-[#054846] font-normal">Projects</span>
            </h2>
            <p className="text-[#004643]/70 text-xl max-w-3xl mx-auto leading-relaxed">
              Explore our carefully curated selection of architectural and
              interior design projects that showcase our commitment to{" "}
              <span className="text-[#054846] font-medium">
                innovation and excellence
              </span>
              .
            </p>
          </div>

          <div className="w-full mb-16">
            <ImageSlider />
          </div>

          <div className="text-center">
            <Link
              to="/portfolio"
              className="group inline-flex items-center px-12 py-6 bg-gradient-to-r from-[#054846] to-[#043c3a] text-white hover:from-[#043c3a] hover:to-[#054846] rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#054846]/25 font-semibold text-lg"
            >
              View All Projects
              <svg
                className="ml-3 w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section - Redesigned */}
      <section className="relative py-32 bg-gradient-to-br from-[#004643] via-[#054846] to-[#004643] overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#54c5c0]/20 rounded-full animate-ping"></div>
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-[#54c5c0]/15 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-[#54c5c0]/25 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#54c5c0]/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 px-6 max-w-5xl mx-auto text-center">
          <h2 className="text-white font-light text-4xl sm:text-5xl lg:text-6xl mb-8 leading-tight">
            Ready to Transform
            <br />
            <span className="text-[#54c5c0] font-normal">Your Space?</span>
          </h2>

          <p className="text-gray-200 text-xl sm:text-2xl mb-16 max-w-3xl mx-auto leading-relaxed">
            Let's collaborate to bring your architectural dreams to life.
            <br />
            <span className="text-[#54c5c0]">Schedule a consultation</span> and
            discover the possibilities.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/contact"
              className="group relative px-12 py-6 bg-white text-[#004643] hover:bg-gray-100 rounded-full transition-all duration-500 transform hover:scale-110 hover:shadow-2xl font-semibold text-lg overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Start Your Project
                <svg
                  className="ml-3 w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </Link>

            <Link
              to="/services"
              className="group px-12 py-6 border-2 border-[#54c5c0]/50 text-[#54c5c0] hover:border-[#54c5c0] hover:bg-[#54c5c0]/10 rounded-full transition-all duration-500 font-medium text-lg backdrop-blur-sm"
            >
              <span className="flex items-center">
                Our Services
                <svg
                  className="ml-3 w-6 h-6 transform group-hover:rotate-12 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
