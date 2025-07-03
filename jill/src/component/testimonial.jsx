import React, { useState } from 'react';
import pic3 from "../assets/images/pic3.jpg";

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote: "Turning visions into reality through innovative design projects",
      description: "As a commercial developer with numerous projects, NextSpace stands out for their exceptional designs and ability to transform spaces into functional works of art.",
      author: "Sarah Johnson",
      position: "Commercial Developer",
      image: pic3
    },
    {
      id: 2,
      quote: "Exceptional design expertise that exceeded our expectations",
      description: "Working with this team was an absolute pleasure. They understood our vision perfectly and delivered a space that truly reflects our brand and values.",
      author: "Michael Chen",
      position: "Restaurant Owner",
      image: pic3
    },
    {
      id: 3,
      quote: "Professional service with attention to every detail",
      description: "From concept to completion, every aspect of our project was handled with precision and creativity. The result speaks for itself.",
      author: "Emily Rodriguez", 
      position: "Boutique Owner",
      image: pic3
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Content */}
          <div className="bg-[#397067] text-white p-8 lg:p-12 rounded-lg lg:rounded-none lg:rounded-l-lg min-h-[500px] flex flex-col justify-center">
            <p className="text-sm uppercase tracking-wider mb-4 opacity-80">TESTIMONIALS</p>
            
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              Client Stories
            </h2>

            {/* Testimonial Content */}
            <div className="mb-8">
              <blockquote className="text-xl lg:text-2xl font-medium mb-6 leading-relaxed">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
              
              <p className="text-lg opacity-90 mb-6 leading-relaxed">
                {testimonials[currentTestimonial].description}
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-lg">
                    {testimonials[currentTestimonial].author}
                  </p>
                  <p className="opacity-80">
                    {testimonials[currentTestimonial].position}
                  </p>
                </div>

                {/* Navigation Arrows */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 rounded-full border border-white/30 hover:bg-white/10 transition-all duration-300"
                    aria-label="Previous testimonial"
                  >
                    <i className="fas fa-chevron-left text-white"></i>
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-full border border-white/30 hover:bg-white/10 transition-all duration-300"
                    aria-label="Next testimonial"
                  >
                    <i className="fas fa-chevron-right text-white"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-white' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative overflow-hidden rounded-lg lg:rounded-none lg:rounded-r-lg min-h-[400px] lg:min-h-[500px]">
            <img
              src={testimonials[currentTestimonial].image}
              alt="Interior design showcase"
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

        </div>

        {/* Mobile Navigation (visible only on mobile) */}
        <div className="flex justify-center gap-4 mt-8 lg:hidden">
          <button
            onClick={prevTestimonial}
            className="p-3 rounded-full bg-[#397067] text-white hover:bg-[#2c5a52] transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            onClick={nextTestimonial}
            className="p-3 rounded-full bg-[#397067] text-white hover:bg-[#2c5a52] transition-all duration-300"
            aria-label="Next testimonial"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* Font Awesome CDN - Add this to your HTML head or import globally */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </section>
  );
};

export default Testimonials;