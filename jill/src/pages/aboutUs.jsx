import { useState, useEffect } from 'react';
import Navbar from '../component/navbar/navbar';
import Footer from '../component/footer/footer';

// Simulated components
<Navbar/>

const Link = ({ to, children, className, ...props }) => (
  <a href={to} className={className} {...props}>
    {children}
  </a>
);

// Images
const heroImage = "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";
const founderImage = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
const teamImage1 = "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
const teamImage2 = "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
const teamImage3 = "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
const studioImage = "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";

const stats = [
  { number: "500+", label: "Projects Completed", icon: "🏆" },
  { number: "12", label: "Years Experience", icon: "⭐" },
  { number: "150+", label: "Happy Clients", icon: "😊" },
  { number: "25+", label: "Awards Won", icon: "🏅" }
];

const values = [
  {
    icon: "💡",
    title: "Innovation",
    description: "We push boundaries and embrace cutting-edge design trends while maintaining timeless elegance."
  },
  {
    icon: "🤝",
    title: "Collaboration",
    description: "Your vision combined with our expertise creates spaces that truly reflect your personality."
  },
  {
    icon: "✨",
    title: "Excellence",
    description: "Every detail matters. We're committed to delivering nothing short of perfection in every project."
  },
  {
    icon: "🌱",
    title: "Sustainability",
    description: "We prioritize eco-friendly materials and sustainable practices in all our design solutions."
  }
];

const teamMembers = [
  {
    name: "Sarah Mitchell",
    role: "Founder & Creative Director",
    image: founderImage,
    description: "With over 15 years in luxury interior design, Sarah founded our studio with a vision to create spaces that tell stories.",
    expertise: ["Luxury Residential", "Brand Strategy", "Team Leadership"]
  },
  {
    name: "David Chen",
    role: "Senior Interior Designer",
    image: teamImage1,
    description: "David specializes in modern commercial spaces and has transformed over 100 office environments across the city.",
    expertise: ["Commercial Design", "Space Planning", "3D Visualization"]
  },
  {
    name: "Maria Rodriguez",
    role: "Project Manager",
    image: teamImage2,
    description: "Maria ensures every project runs smoothly from concept to completion, maintaining our high standards throughout.",
    expertise: ["Project Coordination", "Client Relations", "Quality Control"]
  },
  {
    name: "James Wilson",
    role: "Design Consultant",
    image: teamImage3,
    description: "James brings fresh perspectives to residential projects with his expertise in sustainable and smart home integration.",
    expertise: ["Sustainable Design", "Smart Homes", "Color Theory"]
  }
];

const timeline = [
  { year: "2015", event: "Studio Founded", description: "Started with a vision to revolutionize interior design" },
  { year: "2017", event: "First Major Award", description: "Won 'Best Residential Design' at the National Design Awards" },
  { year: "2019", event: "Team Expansion", description: "Grew to a team of 15 talented designers and specialists" },
  { year: "2021", event: "Sustainable Focus", description: "Launched our eco-friendly design initiative" },
  { year: "2023", event: "Digital Innovation", description: "Introduced VR design consultations and AI-powered planning" },
  { year: "2024", event: "500th Project", description: "Celebrated our 500th completed project milestone" }
];

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeValue, setActiveValue] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const valueInterval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % values.length);
    }, 3000);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(valueInterval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="w-full bg-white text-gray-900 overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            transform: `translateY(${scrollY * 0.5}px) scale(1.1)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#054846]/95 via-[#054846]/80 to-[#00403C]" />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-20 h-20 border-2 border-white/30 rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-emerald-400/20 rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-1/6 w-8 h-32 bg-white/10 transform rotate-12 animate-bounce" style={{ animationDuration: '3s' }} />
        
        <div className={`relative z-10 text-center px-6 max-w-6xl transition-all duration-5000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white mb-8 leading-tight">
            About Us
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-white font-normal">
              Our Story
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-4xl mx-auto font-light leading-relaxed">
            We are passionate creators, innovative thinkers, and dedicated craftspeople who believe that exceptional design has the power to transform lives and spaces.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="group bg-white text-[#054846] px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-50 transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              Work With Us
            </Link>
            <Link 
              to="/portfolio"
              className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-[#054846] transition-all duration-300"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#054846] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div 
                key={idx}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="text-4xl mb-4 group-hover:animate-bounce">{stat.icon}</div>
                <div className="text-3xl lg:text-4xl font-bold text-[#054846] mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm lg:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-light text-[#054846] leading-tight">
                Crafting Dreams Into Reality Since 2015
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  What started as a small passion project in a cramped studio apartment has grown into one of the city's most sought-after interior design firms. Our journey began with a simple belief: every space tells a story, and every story deserves to be told beautifully.
                </p>
                <p>
                  Today, we're a team of creative professionals who share the same vision that started it all. We don't just design spaces; we create experiences, memories, and environments that enhance the way people live, work, and connect with one another.
                </p>
                <p>
                  From luxury penthouses to cozy family homes, from cutting-edge offices to boutique retail spaces, we approach each project with fresh eyes, an open heart, and an unwavering commitment to excellence.
                </p>
              </div>
              
              <div className="pt-8">
                <Link 
                  to="/contact"
                  className="inline-flex items-center bg-[#054846] text-white px-8 py-4 rounded-full font-medium hover:bg-emerald-600 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
                >
                  Start Your Story
                  <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={studioImage} 
                  alt="Our Design Studio"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating accent elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-400 rounded-2xl rotate-12 opacity-80" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#054846] rounded-3xl rotate-45 opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-emerald-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-light text-[#054846] mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide every decision we make and every space we create.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div 
                key={idx}
                className={`group p-8 rounded-2xl transition-all duration-500 cursor-pointer ${
                  activeValue === idx 
                    ? 'bg-[#054846] text-white shadow-2xl scale-105' 
                    : 'bg-white hover:bg-gray-50 hover:shadow-lg hover:scale-102'
                }`}
                onMouseEnter={() => setActiveValue(idx)}
              >
                <div className={`text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300 ${
                  activeValue === idx ? 'animate-bounce' : ''
                }`}>
                  {value.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-4 ${
                  activeValue === idx ? 'text-white' : 'text-[#054846]'
                }`}>
                  {value.title}
                </h3>
                <p className={`leading-relaxed ${
                  activeValue === idx ? 'text-emerald-100' : 'text-gray-600'
                }`}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-light text-[#054846] mb-6">
              Meet Our Creative Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Talented individuals united by a shared passion for transformative design.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <div 
                key={idx}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#054846]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#054846] mb-1">{member.name}</h3>
                  <p className="text-emerald-600 font-medium mb-3 text-sm">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.description}</p>
                  
                  <div className="space-y-1">
                    {member.expertise.map((skill, i) => (
                      <span 
                        key={i}
                        className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs mr-1 mb-1"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#054846]/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="text-center p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                    <p className="text-emerald-300 mb-4">{member.role}</p>
                    <div className="flex justify-center space-x-4">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                        <span className="text-white text-sm">💼</span>
                      </div>
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                        <span className="text-white text-sm">📧</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gradient-to-br from-[#054846] to-[#00403C] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-300 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-light mb-6">Our Journey</h2>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Key milestones that have shaped our story and defined our growth.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-emerald-300/30" />
            
            <div className="space-y-16">
              {timeline.map((item, idx) => (
                <div 
                  key={idx}
                  className={`flex items-center ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${idx % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div className="group">
                      <div className="text-3xl font-bold text-emerald-300 mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold mb-3">{item.event}</h3>
                      <p className="text-emerald-100 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="relative z-10 w-4 h-4 bg-emerald-400 rounded-full border-4 border-white shadow-lg" />
                  
                  <div className="w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
      <Footer/>
    </div>
  );
}