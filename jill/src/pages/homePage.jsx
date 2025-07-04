import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/navbar/navbar";
import ImageSlider from "../component/imageSlider";
import pic2 from "../assets/images/pic2.jpg";
import Footer from "../component/footer/footer";
import spinner from "../assets/images/spinner.png";

const HomePage = () => {
  // Sample design services data
  const services = [
    {
      title: "Residential Design",
      description: "Custom home interiors tailored to your lifestyle",
      icon: "🏠"
    },
    {
      title: "Commercial Spaces",
      description: "Office designs that boost productivity",
      icon: "🏢"
    },
    {
      title: "Space Planning",
      description: "Optimal layouts for maximum functionality",
      icon: "📐"
    },
    {
      title: "Lighting Design",
      description: "Ambient lighting solutions",
      icon: "💡"
    }
  ];

  // Sample testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      quote: "Transformed my apartment into a modern oasis!",
      rating: "★★★★★"
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      quote: "Our office redesign increased employee satisfaction by 40%",
      rating: "★★★★★"
    },
    {
      name: "Emma Williams",
      role: "Real Estate Developer",
      quote: "Consistently delivers beyond expectations",
      rating: "★★★★☆"
    }
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#054846]/95 backdrop-blur-md shadow-lg border-b border-[#054846]/20">
        <Navbar />
      </header>

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white min-h-screen flex items-center pt-16"
        style={{ backgroundImage: `url(${pic2})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        {/* Main Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-8 md:gap-12">
          {/* LEFT: Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight leading-tight tracking-tight">
              Elevating
              <span className="block text-[#54c5c0] font-thin italic">
                Spaces
              </span>
              <span className="block mt-2 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-light">
                Crafting Dreams
              </span>
            </h1>

            <p className="mt-4 sm:mt-6 text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
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

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/contact"
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-[#54c5c0] hover:bg-[#054846] text-[#004643] rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-lg font-semibold text-base sm:text-lg"
              >
                Book an Appointment
                <svg
                  className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transform transition-transform group-hover:translate-x-1"
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
              <Link
                to="/portfolio"
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 border border-[#54c5c0] text-[#54c5c0] hover:bg-[#54c5c0]/10 rounded-full transition-all duration-500 font-medium text-base sm:text-lg"
              >
                View Our Work
              </Link>
            </div>
          </div>

          {/* RIGHT: Spinning Image */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end mb-8 lg:mb-0">
            <img
              src={spinner}
              alt="Spinning Logo"
              className="w-40 h-40 sm:w-50 sm:h-50 animate-spin"
              style={{ animationDuration: "9s" }}
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center text-white/70 animate-bounce">
            <span className="text-xs sm:text-sm mb-1 sm:mb-2 tracking-wider">Scroll</span>
            <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-white/70 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative w-full py-16 sm:py-24 bg-white">
        <div className="px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-[#054846]/10 border border-[#054846]/20 rounded-full text-[#054846] text-xs sm:text-sm font-semibold mb-4 sm:mb-6 tracking-wide uppercase">
              Our Services
            </span>
            <h2 className="text-[#004643] font-light text-3xl sm:text-4xl md:text-5xl mb-6 leading-tight">
              Comprehensive
              <span className="block text-[#054846] font-normal">Design Solutions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="p-6 sm:p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#054846]/10 hover:border-[#054846]/20"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl sm:text-2xl font-medium text-[#054846] mb-2">{service.title}</h3>
                <p className="text-[#004643]/80 text-sm sm:text-base">{service.description}</p>
                <Link 
                  to="/services" 
                  className="mt-4 inline-flex items-center text-[#54c5c0] text-sm sm:text-base font-medium hover:text-[#054846] transition-colors"
                >
                  Learn more
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50/50 overflow-hidden">
        {/* Geometric Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-64 sm:w-96 h-64 sm:h-96 bg-[#054846]/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -right-32 w-64 sm:w-96 h-64 sm:h-96 bg-[#54c5c0]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-center">
            {/* Content Side */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-[#054846]/10 border border-[#054846]/20 rounded-full text-[#054846] text-xs sm:text-sm font-semibold mb-4 sm:mb-6 tracking-wide uppercase">
                  Who We Are
                </span>
                <h2 className="text-[#004643] font-light text-3xl sm:text-4xl md:text-5xl leading-tight mb-6 sm:mb-8">
                  Architecture &
                  <br />
                  <span className="text-[#054846] font-normal">
                    Interior Excellence
                  </span>
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-6 text-[#004643]">
                <p className="text-base sm:text-lg leading-relaxed font-light">
                  We are a <strong className="font-semibold text-[#054846]">premier architectural and interior design firm</strong> dedicated to creating spaces that inspire and endure. Our approach combines innovative design thinking with meticulous attention to detail.
                </p>

                <p className="text-sm sm:text-base leading-relaxed text-[#004643]/80">
                  Every project we undertake is a journey of collaboration, creativity, and craftsmanship. From conceptual sketches to final execution, we ensure every element reflects our commitment to excellence.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-[#054846] text-white hover:bg-[#043c3a] rounded-full transition-all duration-300 transform hover:scale-105 font-medium group text-sm sm:text-base"
                >
                  Learn More About Us
                  <svg
                    className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform"
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
                <Link
                  to="/team"
                  className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 border border-[#054846] text-[#054846] hover:bg-[#054846]/10 rounded-full transition-all duration-300 font-medium text-sm sm:text-base"
                >
                  Meet Our Team
                </Link>
              </div>
            </div>

            {/* Stats Side */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="text-center p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 border border-[#054846]/10">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extralight text-[#054846] mb-2 sm:mb-4">
                  150+
                </div>
                <div className="text-xs sm:text-sm text-[#004643] uppercase tracking-wider font-medium">
                  Projects Completed
                </div>
              </div>
              <div className="text-center p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 border border-[#054846]/10 mt-4 sm:mt-8">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extralight text-[#054846] mb-2 sm:mb-4">
                  10+
                </div>
                <div className="text-xs sm:text-sm text-[#004643] uppercase tracking-wider font-medium">
                  Years Experience
                </div>
              </div>
              <div className="text-center p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 border border-[#054846]/10 -mt-4 sm:-mt-8">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extralight text-[#054846] mb-2 sm:mb-4">
                  98%
                </div>
                <div className="text-xs sm:text-sm text-[#004643] uppercase tracking-wider font-medium">
                  Client Satisfaction
                </div>
              </div>
              <div className="text-center p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 border border-[#054846]/10">
                <div className="text-3xl sm:text-4xl md:text-5xl font-extralight text-[#054846] mb-2 sm:mb-4">
                  24/7
                </div>
                <div className="text-xs sm:text-sm text-[#004643] uppercase tracking-wider font-medium">
                  Support Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="relative py-16 sm:py-24 w-full bg-gradient-to-b from-gray-50 to-white">
        <div className="px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-[#054846]/10 border border-[#054846]/20 rounded-full text-[#054846] text-xs sm:text-sm font-semibold mb-4 sm:mb-6 tracking-wide uppercase">
              Our Work
            </span>
            <h2 className="text-[#004643] font-light text-3xl sm:text-4xl md:text-5xl mb-6 leading-tight">
              Featured
              <span className="block text-[#054846] font-normal">Projects</span>
            </h2>
            <p className="text-[#004643]/70 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              Explore our carefully curated selection of architectural and
              interior design projects that showcase our commitment to{" "}
              <span className="text-[#054846] font-medium">
                innovation and excellence
              </span>
              .
            </p>
          </div>

          <div className="w-full mb-12 sm:mb-16">
            <ImageSlider />
          </div>

          <div className="text-center">
            <Link
              to="/portfolio"
              className="group inline-flex items-center px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-[#054846] to-[#043c3a] text-white hover:from-[#043c3a] hover:to-[#054846] rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-lg sm:hover:shadow-xl hover:shadow-[#054846]/25 font-semibold text-sm sm:text-base"
            >
              View All Projects
              <svg
                className="ml-2 sm:ml-3 w-4 h-4 sm:w-6 sm:h-6 transform group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-300"
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

      {/* Testimonials Section */}
      <section className="relative py-16 sm:py-24 bg-[#054846]/5">
        <div className="px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-[#054846]/10 border border-[#054846]/20 rounded-full text-[#054846] text-xs sm:text-sm font-semibold mb-4 sm:mb-6 tracking-wide uppercase">
              Client Stories
            </span>
            <h2 className="text-[#004643] font-light text-3xl sm:text-4xl md:text-5xl mb-6 leading-tight">
              What Our
              <span className="block text-[#054846] font-normal">Clients Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-6 sm:p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="text-yellow-400 mb-2">{testimonial.rating}</div>
                <p className="text-[#004643] italic mb-4">"{testimonial.quote}"</p>
                <div className="border-t border-[#054846]/10 pt-4">
                  <h4 className="font-medium text-[#054846]">{testimonial.name}</h4>
                  <p className="text-sm text-[#004643]/70">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="relative py-16 sm:py-24 bg-white">
        <div className="px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-[#054846]/10 border border-[#054846]/20 rounded-full text-[#054846] text-xs sm:text-sm font-semibold mb-4 sm:mb-6 tracking-wide uppercase">
              Visit Us
            </span>
            <h2 className="text-[#004643] font-light text-3xl sm:text-4xl md:text-5xl mb-6 leading-tight">
              Our
              <span className="block text-[#054846] font-normal">Studio</span>
            </h2>
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg border border-[#054846]/10">
            <div className="aspect-w-16 aspect-h-9 w-full h-64 sm:h-80 md:h-96">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291234!2d-73.9878449241641!3d40.74844047138972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen 
                loading="lazy"
                title="Our Location"
              ></iframe>
            </div>
            <div className="bg-white p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-medium text-[#054846] mb-2">Design Studio</h3>
              <p className="text-[#004643] mb-4">123 Design Avenue, Creative District</p>
              <p className="text-[#004643]/80 text-sm sm:text-base">Open Monday-Friday: 9am-6pm</p>
              <Link 
                to="/contact" 
                className="mt-4 inline-flex items-center text-[#54c5c0] font-medium hover:text-[#054846] transition-colors text-sm sm:text-base"
              >
                Get directions
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-br from-[#004643] via-[#054846] to-[#004643] overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#54c5c0]/20 rounded-full animate-ping"></div>
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-[#54c5c0]/15 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-[#54c5c0]/25 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-[#54c5c0]/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 px-4 sm:px-6 max-w-5xl mx-auto text-center">
          <h2 className="text-white font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 sm:mb-8 leading-tight">
            Ready to Transform
            <br />
            <span className="text-[#54c5c0] font-normal">Your Space?</span>
          </h2>

          <p className="text-gray-200 text-base sm:text-lg md:text-xl mb-12 sm:mb-16 max-w-3xl mx-auto leading-relaxed">
            Let's collaborate to bring your architectural dreams to life.
            <br />
            <span className="text-[#54c5c0]">Schedule a consultation</span> and
            discover the possibilities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link
              to="/contact"
              className="group relative px-8 sm:px-12 py-4 sm:py-6 bg-white text-[#004643] hover:bg-gray-100 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-lg sm:hover:shadow-xl font-semibold text-sm sm:text-base overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Start Your Project
                <svg
                  className="ml-2 sm:ml-3 w-4 h-4 sm:w-6 sm:h-6 transform group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-300"
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
              className="group px-8 sm:px-12 py-4 sm:py-6 border-2 border-[#54c5c0]/50 text-[#54c5c0] hover:border-[#54c5c0] hover:bg-[#54c5c0]/10 rounded-full transition-all duration-500 font-medium text-sm sm:text-base backdrop-blur-sm"
            >
              <span className="flex items-center">
                Our Services
                <svg
                  className="ml-2 sm:ml-3 w-4 h-4 sm:w-6 sm:h-6 transform group-hover:rotate-12 transition-transform duration-300"
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