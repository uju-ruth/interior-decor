import { useState, useEffect } from 'react';
import Footer from '../component/footer/footer';
import Navbar from '../component/navbar/navbar';
import { Link } from 'react-router-dom';

// Placeholder images (replace with your actual imports)
const bgImage = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";
const residentialImg = "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
const commercialImg = "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
const luxuryImg = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
const projectImg = "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

const ServicesPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
    }, 5000);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Main Services Data
  const mainServices = [
    {
      title: "Residential Design",
      description: "Transform your home into a personal sanctuary with our bespoke residential interior design services that reflect your lifestyle and personality.",
      icon: "🏡",
      features: [
        "Complete Space Planning & Layout Design",
        "Custom Furniture Design & Selection",
        "Color Palette & Material Consultation",
        "Lighting Design & Installation",
        "Window Treatments & Soft Furnishings",
        "Art Curation & Accessory Selection"
      ],
      price: "Starting from $150/sq ft",
      timeline: "4-8 weeks",
      image: residentialImg,
      highlights: [
        "Personalized design consultations",
        "3D visualization of your space",
        "Sustainable material options",
        "Smart home integration"
      ]
    },
    {
      title: "Commercial Spaces",
      description: "Create inspiring work environments that boost productivity, enhance brand identity, and leave lasting impressions on clients and employees.",
      icon: "🏢",
      features: [
        "Corporate Office Design & Branding",
        "Retail Store Layout & Visual Merchandising",
        "Restaurant & Hospitality Design",
        "Reception & Lobby Area Design",
        "Conference Room & Meeting Spaces",
        "Ergonomic Workspace Solutions"
      ],
      price: "Starting from $200/sq ft",
      timeline: "6-12 weeks",
      image: commercialImg,
      highlights: [
        "Brand-aligned design strategy",
        "Employee productivity analysis",
        "Visitor experience optimization",
        "Modular furniture solutions"
      ]
    },
    {
      title: "Luxury Interiors",
      description: "Exclusive high-end designs featuring premium materials, world-class craftsmanship, and bespoke solutions for discerning clients.",
      icon: "💎",
      features: [
        "Bespoke Furniture & Custom Millwork",
        "Premium Materials & Rare Finishes",
        "Smart Home Integration & Automation",
        "Private Concierge Design Service",
        "International Sourcing & Procurement",
        "White-Glove Installation & Styling"
      ],
      price: "Starting from $500/sq ft",
      timeline: "8-16 weeks",
      image: luxuryImg,
      highlights: [
        "VIP client experience",
        "Exclusive access to luxury brands",
        "Private viewings of materials",
        "Discreet project management"
      ]
    }
  ];

  // Additional Services
  const additionalServices = [
    {
      title: "3D Visualization",
      description: "Photorealistic renderings and virtual walkthroughs that bring your design to life before implementation.",
      icon: "🎨",
      features: [
        "3D Floor Plans & Elevations",
        "Virtual Reality Tours",
        "Material & Finish Mockups",
        "Lighting Simulation"
      ],
      startingPrice: "$1,500"
    },
    {
      title: "Project Management",
      description: "Comprehensive oversight of your project from concept to completion with our expert team.",
      icon: "📋",
      features: [
        "Timeline & Budget Management",
        "Vendor & Contractor Coordination",
        "Quality Control Inspections",
        "Installation Supervision"
      ],
      startingPrice: "15% of project cost"
    },
    {
      title: "Design Consultation",
      description: "Expert advice and tailored recommendations to enhance your existing space or plan new designs.",
      icon: "💡",
      features: [
        "2-Hour On-Site Assessment",
        "Color Scheme Development",
        "Furniture Layout Planning",
        "Purchasing Recommendations"
      ],
      startingPrice: "$350/hour"
    },
    {
      title: "Renovation Planning",
      description: "Strategic guidance for structural changes and space reconfiguration to maximize functionality.",
      icon: "🔧",
      features: [
        "Structural Assessment",
        "Permit Acquisition Assistance",
        "Phased Implementation Plan",
        "Temporary Space Solutions"
      ],
      startingPrice: "$2,500"
    }
  ];

  // Design Process
  const process = [
    {
      step: "01",
      title: "Discovery & Consultation",
      description: "We begin with an in-depth consultation to understand your vision, lifestyle, and requirements through questionnaires, interviews, and site visits.",
      icon: "🤝",
      duration: "1-2 weeks"
    },
    {
      step: "02",
      title: "Concept Development",
      description: "Our team creates initial concepts, mood boards, and preliminary sketches that capture your desired aesthetic and functional needs.",
      icon: "✨",
      duration: "2-3 weeks"
    },
    {
      step: "03", 
      title: "Design & Planning",
      description: "Detailed space planning, 3D visualizations, material selections, and comprehensive design documentation for precise implementation.",
      icon: "📐",
      duration: "3-6 weeks"
    },
    {
      step: "04",
      title: "Implementation",
      description: "Professional project management ensures seamless execution with regular updates, quality checks, and final styling for picture-perfect results.",
      icon: "🚀",
      duration: "Varies by project"
    }
  ];

  // Featured Projects
  const featuredProjects = [
    { 
      img: residentialImg, 
      title: "Modern Minimalist Home", 
      category: "Residential", 
      year: "2024",
      description: "A 3,500 sq ft family home featuring clean lines, natural materials, and smart home technology throughout."
    },
    { 
      img: commercialImg, 
      title: "Executive Office Suite", 
      category: "Commercial", 
      year: "2024",
      description: "12,000 sq ft corporate headquarters with collaborative workspaces and premium client meeting areas."
    },
    { 
      img: luxuryImg, 
      title: "Luxury Penthouse", 
      category: "Luxury", 
      year: "2023",
      description: "8,000 sq ft penthouse with custom millwork, imported materials, and panoramic city views."
    },
    { 
      img: projectImg, 
      title: "Boutique Hotel Lobby", 
      category: "Commercial", 
      year: "2023",
      description: "Signature lobby design creating a memorable first impression with curated art and lighting."
    }
  ];

  return (
    <div className="w-full bg-white text-[#004643] overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-110 transition-transform duration-[20s] ease-out"
          style={{ 
            backgroundImage: `url(${bgImage})`,
            transform: `scale(1.1) translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#054846]/90 via-[#054846]/70 to-transparent" />
        
        {/* Floating Elements */}
        <div className="absolute top-32 left-20 w-4 h-4 bg-[#54c5c0] rounded-full animate-pulse opacity-60" />
        <div className="absolute bottom-40 right-32 w-6 h-6 bg-white rounded-full animate-bounce opacity-30" />
        <div className="absolute top-1/2 right-20 w-3 h-3 bg-[#54c5c0] rounded-full animate-ping opacity-40" />
        
        <div className={`relative z-10 text-center px-6 max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
            Transform Your Space
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#54c5c0] to-white font-normal mt-2">
              With Our Expert Services
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Comprehensive interior solutions tailored to your vision, from concept to completion.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="group relative bg-white text-[#054846] px-8 py-3 sm:px-10 sm:py-4 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <span className="relative z-10 flex items-center justify-center">
                Start Your Project
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            <Link 
              to="/portfolio"
              className="group relative border-2 border-white text-white px-8 py-3 sm:px-10 sm:py-4 rounded-full font-medium text-lg overflow-hidden transition-all duration-300 hover:bg-white/10 hover:shadow-xl"
            >
              View Our Work
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center text-white/70 animate-bounce">
            <span className="text-sm mb-1 tracking-wider">Explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/70 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-block px-6 py-3 bg-[#054846]/10 border border-[#054846]/20 rounded-full text-[#054846] text-sm font-semibold mb-6 tracking-wide uppercase">
              What We Offer
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#054846] mb-6">
              Comprehensive Design Services
            </h2>
            <p className="text-lg sm:text-xl text-[#004643]/80 max-w-3xl mx-auto">
              Tailored solutions for residential, commercial, and luxury spaces that combine aesthetics with functionality.
            </p>
          </div>

          {/* Service Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-full p-1 shadow-sm border border-[#054846]/10">
              {mainServices.map((service, index) => (
                <button
                  key={index}
                  onClick={() => setActiveService(index)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeService === index ? 'bg-[#054846] text-white' : 'text-[#054846] hover:bg-[#054846]/10'}`}
                >
                  {service.title}
                </button>
              ))}
            </div>
          </div>

          {/* Service Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative group overflow-hidden rounded-3xl shadow-xl">
              <img 
                src={mainServices[activeService].image} 
                alt={mainServices[activeService].title}
                className="w-full h-[400px] sm:h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="text-white text-sm font-medium mb-2">Featured Project</div>
                <h3 className="text-2xl font-light text-white">{mainServices[activeService].title} Showcase</h3>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="text-5xl mb-4">{mainServices[activeService].icon}</div>
              <h3 className="text-3xl sm:text-4xl font-light text-[#054846] mb-4">
                {mainServices[activeService].title}
              </h3>
              <p className="text-[#004643]/80 text-lg leading-relaxed mb-6">
                {mainServices[activeService].description}
              </p>
              
              {/* Highlights */}
              <div className="mb-8">
                <h4 className="text-lg font-medium text-[#054846] mb-3">Key Highlights:</h4>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {mainServices[activeService].highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start">
                      <span className="w-2 h-2 bg-[#54c5c0] rounded-full mt-2 mr-2 flex-shrink-0" />
                      <span className="text-[#004643]/90 text-sm sm:text-base">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features Grid */}
              <div className="mb-8">
                <h4 className="text-lg font-medium text-[#054846] mb-3">Service Includes:</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {mainServices[activeService].features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <span className="w-2 h-2 bg-[#054846] rounded-full mt-2 mr-2 flex-shrink-0" />
                      <span className="text-[#004643]/80 text-sm sm:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing & Timeline */}
              <div className="grid sm:grid-cols-2 gap-6 p-6 bg-white rounded-2xl shadow-lg border border-[#054846]/10">
                <div>
                  <div className="text-sm text-[#004643]/60 mb-1">Starting Price</div>
                  <div className="text-xl font-semibold text-[#054846]">{mainServices[activeService].price}</div>
                </div>
                <div>
                  <div className="text-sm text-[#004643]/60 mb-1">Project Timeline</div>
                  <div className="text-xl font-semibold text-[#054846]">{mainServices[activeService].timeline}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link 
                  to="/contact"
                  className="flex-1 text-center bg-[#054846] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold hover:bg-[#043c3a] transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                >
                  Get Custom Quote
                </Link>
                <Link 
                  to="/portfolio"
                  className="flex-1 text-center border border-[#054846] text-[#054846] px-6 py-3 sm:px-8 sm:py-4 rounded-full font-medium hover:bg-[#054846]/10 transition-all duration-300"
                >
                  View Similar Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Process Section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-block px-6 py-3 bg-[#054846]/10 border border-[#054846]/20 rounded-full text-[#054846] text-sm font-semibold mb-6 tracking-wide uppercase">
              Our Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#054846] mb-6">
              The Design Process
            </h2>
            <p className="text-lg sm:text-xl text-[#004643]/80 max-w-3xl mx-auto">
              A structured approach that ensures your vision becomes reality with precision and care.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-[#054846] via-[#54c5c0] to-[#054846] z-0" />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative z-10">
              {process.map((step, idx) => (
                <div 
                  key={idx}
                  className="group text-center lg:text-left bg-white p-6 rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col items-center lg:items-start">
                    <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                    <div className="text-2xl font-bold text-[#054846] mb-2">{step.step}</div>
                    <h3 className="text-xl font-semibold text-[#004643] mb-4">{step.title}</h3>
                    <p className="text-[#004643]/70 mb-4 leading-relaxed">{step.description}</p>
                    <div className="text-sm text-[#54c5c0] font-medium">Duration: {step.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-block px-6 py-3 bg-[#054846]/10 border border-[#054846]/20 rounded-full text-[#054846] text-sm font-semibold mb-6 tracking-wide uppercase">
              Specialized Services
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#054846] mb-6">
              Complementary Offerings
            </h2>
            <p className="text-lg sm:text-xl text-[#004643]/80 max-w-3xl mx-auto">
              Enhance your project with our specialized services tailored to specific needs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, idx) => (
              <div 
                key={idx}
                className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-[#054846]/10"
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#054846] mb-3">{service.title}</h3>
                <p className="text-[#004643]/80 text-sm sm:text-base mb-4">{service.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-[#054846] mb-2">Includes:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-[#004643]/80 text-sm">
                        <span className="w-1.5 h-1.5 bg-[#54c5c0] rounded-full mr-2 mt-1.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-sm text-[#004643]/60">Starting at: <span className="font-semibold text-[#054846]">{service.startingPrice}</span></div>
                
                <Link 
                  to="/contact" 
                  className="mt-4 inline-flex items-center text-[#54c5c0] text-sm font-medium hover:text-[#054846] transition-colors group"
                >
                  Request Service
                  <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-block px-6 py-3 bg-[#054846]/10 border border-[#054846]/20 rounded-full text-[#054846] text-sm font-semibold mb-6 tracking-wide uppercase">
              Our Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#054846] mb-6">
              Featured Projects
            </h2>
            <p className="text-lg sm:text-xl text-[#004643]/80 max-w-3xl mx-auto">
              Explore our recent work showcasing the breadth of our design services.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl shadow-xl">
            <div 
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredProjects.map((project, idx) => (
                <div key={idx} className="w-full flex-shrink-0 relative">
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img 
                      src={project.img} 
                      alt={project.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 lg:p-12">
                      <div className="text-[#54c5c0] font-medium mb-2">{project.category} • {project.year}</div>
                      <h3 className="text-2xl lg:text-3xl font-light text-white mb-3">{project.title}</h3>
                      <p className="text-white/90 text-sm lg:text-base mb-6 max-w-xl">{project.description}</p>
                      <Link 
                        to="/portfolio"
                        className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium hover:bg-white/30 transition-all duration-300 group"
                      >
                        View Project Details
                        <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <div className="absolute bottom-6 right-6 flex space-x-2">
              {featuredProjects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <Link 
              to="/portfolio"
              className="inline-flex items-center bg-gradient-to-r from-[#054846] to-[#043c3a] text-white px-10 py-4 rounded-full font-semibold hover:from-[#043c3a] hover:to-[#054846] transition-all duration-500 hover:shadow-xl hover:scale-105 group"
            >
              View Full Portfolio
              <svg className="ml-3 w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-[#004643] via-[#054846] to-[#004643] overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
            Ready to Begin Your Design Journey?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            Contact us today to schedule a consultation and discover how we can transform your space.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="group relative bg-white text-[#054846] px-8 py-4 sm:px-10 sm:py-5 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <span className="relative z-10 flex items-center justify-center">
                Schedule Consultation
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            <Link 
              to="/contact"
              className="group relative border-2 border-white text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full font-medium text-lg overflow-hidden transition-all duration-300 hover:bg-white/10 hover:shadow-xl"
            >
              Call Us: (555) 123-4567
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;