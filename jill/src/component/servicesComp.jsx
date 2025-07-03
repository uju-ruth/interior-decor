import React, { useState } from 'react';
import pic3 from "../assets/images/pic3.jpg";

const ServiceCard = ({
  image = pic3,
  number,
  title,
  description,
  expandedDetails,
  reverse = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`flex flex-col lg:flex-row items-center gap-8 ${
      reverse ?  'lg:flex-row-reverse' : ''
    }`}>
      {/* Image Section */}
      <div className="flex-1 relative group">
        <div className="overflow-hidden shadow-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-[600px] object-cover transition-transform duration-300 group-hover:scale-105 "
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 space-y-4">
        <h3 className="text-3xl font-bold text-[#397067] leading-tight">
          {title}
        </h3>
        <p className="text-[#999E9E] text-lg leading-relaxed">
          {description}
        </p>
        
        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-6 p-6">
            <div className="space-y-4">
              {expandedDetails.map((detail, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 text-[#999E9E] text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-[#397067] mb-1.5">
                      {detail.subheading}
                    </h4>
                    <p className="text-[#999E9E] leading-relaxed">
                      {detail.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button 
          onClick={toggleExpanded}
          className="inline-flex items-center text-[#999E9E] hover:text-[#397067] font-semibold transition-colors"
        >
          {isExpanded ? 'Show Less' : 'Learn More'}
          <svg 
            className={`ml-2 w-4 h-4 transition-transform duration-200 ${
              isExpanded ? 'rotate-90' : ''
            }`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const Services = () => {
  const servicesData = [
    {
      number: "01",
      title: "Interior Design Consultation",
      description: "Transform your space with our expert design consultation. We analyze your needs, style preferences, and budget to create a personalized design plan that reflects your vision.",
      expandedDetails: [
        {
          subheading: "Initial Consultation Meeting",
          description: "Comprehensive discussion session to understand your lifestyle, preferences, and functional requirements for your space transformation."
        },
        {
          subheading: "Space Assessment & Analysis",
          description: "Professional evaluation including precise measurements, architectural analysis, and detailed lighting assessment of your current space."
        },
        {
          subheading: "Style Discovery Process",
          description: "Personalized exploration through curated mood boards, color palettes, and material samples tailored specifically to your aesthetic taste."
        },
        
      ]
    },
    {
      number: "02",
      title: "Space Planning & Layout",
      description: "Optimize your space with our strategic planning services. We create functional layouts that maximize your area while maintaining aesthetic appeal and flow.",
      expandedDetails: [
        {
          subheading: "Architectural Documentation",
          description: "Precise measurements and detailed space documentation using professional tools and advanced surveying techniques."
        },
        {
          subheading: "3D Modeling & Visualization",
          description: "Advanced CAD drawings and 3D modeling to accurately visualize different layout configurations before implementation."
        },
        {
          subheading: "Traffic Flow Analysis",
          description: "Strategic analysis to ensure optimal movement patterns and circulation throughout your space for maximum efficiency."
        },
        {
          subheading: "Furniture Placement Strategy",
          description: "Expert positioning strategies that maximize functionality while maintaining perfect visual balance and aesthetic appeal."
        }
      ]
    },
    {
      number: "03",
      title: "Color & Material Selection",
      description: "Choose the perfect palette and materials for your project. Our designers help you select colors, textures, and finishes that complement your style and budget.",
      expandedDetails: [
        {
          subheading: "Color Psychology Consultation",
          description: "Expert guidance on how different color schemes affect mood, atmosphere, and overall well-being in your living space."
        },
        {
          subheading: "Lighting & Color Assessment",
          description: "Professional evaluation to ensure colors appear vibrant and true under various lighting conditions throughout the day."
        },
        {
          subheading: "Premium Material Sourcing",
          description: "Access to high-quality materials from trusted suppliers with focus on durability, sustainability, and aesthetic excellence."
        },
        {
          subheading: "Texture & Pattern Coordination",
          description: "Expert coordination of textures and patterns to create visual interest and tactile appeal throughout your entire space."
        }
      ]
    },
    {
      number: "04",
      title: "Project Management",
      description: "From concept to completion, we manage every detail of your project. Our team coordinates with contractors, suppliers, and craftsmen to ensure timely delivery.",
      expandedDetails: [
        {
          subheading: "Project Scheduling & Timeline",
          description: "Comprehensive project scheduling with detailed timelines, milestone tracking, and realistic delivery expectations."
        },
        {
          subheading: "Contractor Coordination",
          description: "Professional oversight and quality control management throughout all construction phases and installation processes."
        },
        {
          subheading: "Vendor & Supply Management",
          description: "Complete management of ordering, delivery scheduling, and installation coordination with all suppliers and vendors."
        }
      ]
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Services Grid */}
        <div className="space-y-20">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={service.number}
              image={pic3}
              number={service.number}
              title={service.title}
              description={service.description}
              expandedDetails={service.expandedDetails}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;