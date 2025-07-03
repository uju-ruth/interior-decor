import { useState, useEffect } from 'react';
import Footer from '../component/footer/footer';
import Navbar from '../component/navbar/navbar';

// Simulated Link component for demo
const Link = ({ to, children, className, ...props }) => (
  <a href={to} className={className} {...props}>
    {children}
  </a>
);

// Placeholder images for demo
const bgImage = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";
const pic1 = "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
const pic2 = "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
const pic3 = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
const pic4 = "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

// Simulated Navbar component
<Navbar/>


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
    image: pic1
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
    image: pic2
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
    image: pic3
  }
];

const additionalServices = [
  {
    title: "3D Visualization",
    description: "Photorealistic renderings and virtual walkthroughs",
    icon: "🎨",
    features: ["3D Floor Plans", "Virtual Reality Tours", "Material Mock-ups"]
  },
  {
    title: "Project Management",
    description: "End-to-end project coordination and execution",
    icon: "📋",
    features: ["Timeline Management", "Vendor Coordination", "Quality Control"]
  },
  {
    title: "Consultation Services",
    description: "Expert advice and design guidance",
    icon: "💡",
    features: ["Design Audits", "Color Consultations", "Space Planning"]
  },
  {
    title: "Renovation Planning",
    description: "Complete renovation strategy and planning",
    icon: "🔧",
    features: ["Structural Assessment", "Budget Planning", "Permit Assistance"]
  }
];

const process = [
  {
    step: "01",
    title: "Discovery & Consultation",
    description: "We begin with an in-depth consultation to understand your vision, lifestyle, and requirements.",
    icon: "🤝"
  },
  {
    step: "02",
    title: "Concept Development",
    description: "Our team creates initial concepts and mood boards that capture your desired aesthetic.",
    icon: "✨"
  },
  {
    step: "03", 
    title: "Design & Planning",
    description: "Detailed space planning, 3D visualizations, and comprehensive design documentation.",
    icon: "📐"
  },
  {
    step: "04",
    title: "Implementation",
    description: "Professional project management ensures seamless execution from start to finish.",
    icon: "🚀"
  }
];

const featuredProjects = [
  { img: pic1, title: "Modern Minimalist Home", category: "Residential", year: "2024" },
  { img: pic2, title: "Executive Office Suite", category: "Commercial", year: "2024" },
  { img: pic3, title: "Luxury Penthouse", category: "Luxury", year: "2023" },
  { img: pic4, title: "Boutique Hotel Lobby", category: "Commercial", year: "2023" }
];

export default function ServicesPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
    }, 4000);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="w-full bg-white text-gray-900 overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-110 transition-transform duration-[20s] ease-out"
          style={{ 
            backgroundImage: `url(${bgImage})`,
            transform: `scale(1.1) translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#054846]/90 via-[#054846]/70 to-transparent" />
        
        {/* Floating Elements */}
        <div className="absolute top-32 left-20 w-4 h-4 bg-emerald-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute bottom-40 right-32 w-6 h-6 bg-white rounded-full animate-bounce opacity-30" />
        <div className="absolute top-1/2 right-20 w-3 h-3 bg-emerald-300 rounded-full animate-ping opacity-40" />
        
        <div className={`relative z-10 text-center px-6 max-w-5xl transition-all duration-2000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
           
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-100 font-normal">
               Our Services
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            From residential sanctuaries to commercial masterpieces, we craft spaces that inspire and transform lives.
          </p>
          
          <Link 
            to="/contact"
            className="group relative bg-white text-[#054846] px-10 py-4 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            <span className="relative z-10">Start Your Project</span>
            <div className="absolute transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </Link>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-light text-[#054846] mb-6">
              Our Core Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive interior design solutions tailored to your unique vision and requirements.
            </p>
          </div>

          <div className="space-y-24">
            {mainServices.map((service, idx) => (
              <div 
                key={idx}
                className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              >
                {/* Image */}
                <div className="lg:w-1/2">
                  <div className="relative group overflow-hidden rounded-3xl">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#054846]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-1/2 space-y-6">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-3xl lg:text-4xl font-light text-[#054846] mb-4">{service.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">{service.description}</p>
                  
                  {/* Features Grid */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <span className="w-2 h-2 bg-[#054846] rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Service Details */}
                  <div className="grid sm:grid-cols-2 gap-6 p-6 bg-white rounded-2xl shadow-lg">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Starting Price</div>
                      <div className="text-lg font-semibold text-[#054846]">{service.price}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Timeline</div>
                      <div className="text-lg font-semibold text-[#054846]">{service.timeline}</div>
                    </div>
                  </div>

                  <Link 
                    to="/contact"
                    className="inline-flex items-center bg-[#054846] text-white px-8 py-3 rounded-full font-medium hover:bg-emerald-600 transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    Get Quote
                    <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-light text-[#054846] mb-6">
              Our Design Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach that ensures exceptional results and seamless project delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, idx) => (
              <div 
                key={idx}
                className="group text-center relative"
              >
                {/* Connection Line */}
                {idx < process.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-[#054846] to-emerald-300 transform translate-x-4 z-0" />
                )}
                
                <div className="relative z-10 bg-white">
                  <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <div className="text-3xl font-bold text-[#054846] mb-4">{step.step}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-[#054846] mb-6">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive support services to complement your interior design project.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, idx) => (
              <div 
                key={idx}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#054846] mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700 text-sm">
                      <span className="w-1.5 h-1.5 bg-[#054846] rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Carousel */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-[#054846] mb-6">
              Recent Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our latest work showcasing our diverse service capabilities.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredProjects.map((project, idx) => (
                <div key={idx} className="w-full flex-shrink-0 relative">
                  <div className="aspect-[21/9] relative overflow-hidden">
                    <img 
                      src={project.img} 
                      alt={project.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 lg:p-12">
                      <div className="text-emerald-400 font-medium mb-2">{project.category} • {project.year}</div>
                      <h3 className="text-2xl lg:text-4xl font-light text-white mb-4">{project.title}</h3>
                      <Link 
                        to="/portfolio"
                        className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium hover:bg-white/30 transition-all duration-300"
                      >
                        View Project
                        <span className="ml-2">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="absolute bottom-6 right-6 flex space-x-2">
              {featuredProjects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      
      <Footer/>
    </div>
  );
}