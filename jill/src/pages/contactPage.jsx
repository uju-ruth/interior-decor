import { useState, useEffect, useRef } from 'react';
import Navbar from '../component/navbar/navbar';
import Footer from '../component/footer/footer';
import { io } from 'socket.io-client';

// Contact images
const contactHeroImage = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";
const officeImage = "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
const teamImage = "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', or 'error'
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [socket, setSocket] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [adminOnline, setAdminOnline] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const chatEndRef = useRef(null);

  // Form subjects
  const subjects = [
    'General Inquiry',
    'Project Consultation',
    'Service Quote',
    'Career Opportunities',
    'Press & Media',
    'Partnerships'
  ];

  // Initialize socket connection
  useEffect(() => {
    const storedSessionId = localStorage.getItem('chatSessionId') || 
                          Math.random().toString(36).substring(2, 15) + 
                          Math.random().toString(36).substring(2, 15);
    setSessionId(storedSessionId);
    localStorage.setItem('chatSessionId', storedSessionId);

    const newSocket = io(BACKEND_URL, {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 5000,
      transports: ['websocket']
    });

    setSocket(newSocket);
    setConnectionStatus('connecting');

    // Socket event handlers
    newSocket.on('connect', () => {
      setConnectionStatus('connected');
      newSocket.emit('init-session', storedSessionId);
    });

    newSocket.on('disconnect', () => {
      setConnectionStatus('disconnected');
    });

    newSocket.on('connect_error', (err) => {
      console.error('Connection error:', err);
      setConnectionStatus('error');
    });

    newSocket.on('new-message', (message) => {
      setChatMessages(prev => [...prev, message]);
      scrollToBottom();
    });

    newSocket.on('admin-typing', (typing) => {
      setIsTyping(typing);
    });

    newSocket.on('admin-status', (online) => {
      setAdminOnline(online);
    });

    // Load chat history
    const loadChatHistory = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/chat/${storedSessionId}`);
        if (!response.ok) throw new Error('Failed to load chat history');
        const data = await response.json();
        if (data.messages) {
          setChatMessages(data.messages);
          setTimeout(scrollToBottom, 100);
        }
      } catch (err) {
        console.error('Error loading chat history:', err);
      }
    };

    loadChatHistory();

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
      
      // Auto-open live chat after successful submission
      setIsChatOpen(true);
      
      // Add welcome message to chat
      if (socket && connectionStatus === 'connected') {
        const welcomeMessage = {
          sender: 'system',
          content: `Hi ${formData.name}! Thanks for contacting us about "${formData.subject}". We've received your message and our team will assist you shortly.`,
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, welcomeMessage]);
        setTimeout(scrollToBottom, 200);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !socket || connectionStatus !== 'connected') return;

    const messageObj = {
      sender: 'user',
      content: newMessage,
      timestamp: new Date()
    };

    socket.emit('send-message', {
      sessionId,
      sender: 'user',
      content: newMessage
    });

    setChatMessages(prev => [...prev, messageObj]);
    setNewMessage('');
    scrollToBottom();
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    if (socket && connectionStatus === 'connected') {
      socket.emit('typing', e.target.value.length > 0);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      setTimeout(scrollToBottom, 100);
    }
  };

  return (
    <div className="w-full bg-white text-[#004643]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={contactHeroImage} 
            alt="Contact Us" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#054846]/90 to-[#054846]/70" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6">
            Let's Create Something Beautiful
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Our design team is ready to bring your vision to life. Reach out to start your interior design journey today.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Contact Sections */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 lg:p-10 border border-[#054846]/10">
            <h2 className="text-3xl font-light text-[#054846] mb-2">Send Us a Message</h2>
            <p className="text-[#004643]/80 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>
            
            {submitStatus === 'success' ? (
              <div className="bg-[#054846]/10 border border-[#054846]/20 rounded-xl p-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-[#054846] text-white p-2 rounded-full mr-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#054846] mb-1">Message Sent Successfully!</h3>
                    <p className="text-[#004643]/80">
                      Thank you for contacting us. We've received your message and our team will get back to you soon.
                    </p>
                    <button 
                      onClick={() => setSubmitStatus(null)}
                      className="mt-4 text-[#054846] font-medium hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-[#004643] font-medium mb-2">Full Name*</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#054846]/30 rounded-lg focus:ring-2 focus:ring-[#054846] focus:border-[#054846] outline-none transition"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-[#004643] font-medium mb-2">Email*</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#054846]/30 rounded-lg focus:ring-2 focus:ring-[#054846] focus:border-[#054846] outline-none transition"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-[#004643] font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#054846]/30 rounded-lg focus:ring-2 focus:ring-[#054846] focus:border-[#054846] outline-none transition"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-[#004643] font-medium mb-2">Subject*</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#054846]/30 rounded-lg focus:ring-2 focus:ring-[#054846] focus:border-[#054846] outline-none transition bg-white"
                      required
                    >
                      {subjects.map((subject, index) => (
                        <option key={index} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-[#004643] font-medium mb-2">Your Message*</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#054846]/30 rounded-lg focus:ring-2 focus:ring-[#054846] focus:border-[#054846] outline-none transition"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#054846] text-white px-6 py-4 rounded-lg font-semibold hover:bg-[#043c3a] transition-all duration-300 hover:shadow-lg disabled:opacity-70 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>

                {submitStatus === 'error' && (
                  <div className="text-red-500 text-center mt-4">
                    Failed to send message. Please try again or contact us directly.
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-light text-[#054846] mb-6">Contact Information</h2>
              <p className="text-[#004643]/80">
                Whether you're ready to start a project or just have questions, we're here to help. Reach out through any of these channels.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-[#054846]/10 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#054846]/10 p-3 rounded-full flex-shrink-0">
                    <svg className="w-6 h-6 text-[#054846]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#054846] mb-2">Call Us</h3>
                    <p className="text-[#004643]/80 mb-1">+1 (555) 123-4567</p>
                    <p className="text-sm text-[#004643]/60">Monday - Friday, 9am - 6pm EST</p>
                    <button className="mt-3 text-[#054846] font-medium hover:underline flex items-center">
                      Schedule a Call
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-[#054846]/10 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#054846]/10 p-3 rounded-full flex-shrink-0">
                    <svg className="w-6 h-6 text-[#054846]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#054846] mb-2">Email Us</h3>
                    <p className="text-[#004643]/80 mb-1">info@interiordecor.com</p>
                    <p className="text-[#004643]/80 mb-3">support@interiordecor.com</p>
                    <button className="text-[#054846] font-medium hover:underline flex items-center">
                      Send an Email
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-[#054846]/10 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#054846]/10 p-3 rounded-full flex-shrink-0">
                    <svg className="w-6 h-6 text-[#054846]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#054846] mb-2">Visit Us</h3>
                    <p className="text-[#004643]/80 mb-1">123 Design Avenue</p>
                    <p className="text-[#004643]/80 mb-3">New York, NY 10001</p>
                    <button className="text-[#054846] font-medium hover:underline flex items-center">
                      Get Directions
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Image */}
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src={officeImage} 
                alt="Our Design Studio" 
                className="w-full h-auto object-cover"
              />
              <div className="bg-[#054846] text-white p-4 text-center">
                <p className="font-medium">Schedule a Studio Visit</p>
              </div>
            </div>
          </div>
        </div>

        {/* Meet the Team Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-[#054846] mb-4">Meet Our Design Team</h2>
          <p className="text-[#004643]/80 max-w-2xl mx-auto mb-12">
            Get to know the talented professionals who will bring your vision to life.
          </p>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-md overflow-hidden border border-[#054846]/10 hover:shadow-lg transition-all duration-300">
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img 
                    src={teamImage} 
                    alt={`Designer ${item}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#054846] mb-1">Designer Name</h3>
                  <p className="text-[#004643]/70 mb-4">Lead Interior Designer</p>
                  <button className="text-[#054846] font-medium hover:underline flex items-center justify-center w-full">
                    View Profile
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className={`relative p-4 rounded-full shadow-xl transition-all transform hover:scale-105 ${
            adminOnline ? 'bg-[#054846] hover:bg-[#043c3a]' : 'bg-gray-500 hover:bg-gray-600'
          } text-white`}
          aria-label={isChatOpen ? "Close chat" : "Open chat"}
        >
          {isChatOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
          {adminOnline && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
          )}
          {connectionStatus === 'connecting' && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white animate-pulse"></span>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-md h-[500px] bg-white rounded-xl shadow-2xl overflow-hidden z-50 border border-[#054846]/20 flex flex-col">
          <div className={`p-4 rounded-t-lg flex justify-between items-center ${
            adminOnline ? 'bg-[#054846]' : 'bg-gray-500'
          } text-white`}>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="text-lg font-semibold">
                Live Chat Support
                {adminOnline ? (
                  <span className="ml-2 text-xs font-normal bg-white/20 px-2 py-0.5 rounded-full">Online</span>
                ) : (
                  <span className="ml-2 text-xs font-normal bg-white/20 px-2 py-0.5 rounded-full">Offline</span>
                )}
              </h3>
            </div>
            {isTyping && (
              <div className="text-xs italic flex items-center">
                <span className="flex h-2 w-2 mr-1">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Typing...
              </div>
            )}
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
            {chatMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-[#004643]/60 p-8 text-center">
                <svg className="w-12 h-12 mb-4 text-[#054846]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <h4 className="text-lg font-medium text-[#054846] mb-2">How can we help you today?</h4>
                <p className="mb-4">
                  {adminOnline 
                    ? "Our design team is online and ready to assist you with your project."
                    : connectionStatus === 'connected'
                      ? "Our team is currently offline. Leave a message and we'll get back to you soon."
                      : "Connecting to chat service..."}
                </p>
                {adminOnline && (
                  <button 
                    onClick={() => {
                      setNewMessage("Hi! I'd like to discuss a design project.");
                      setTimeout(() => {
                        document.querySelector('.chat-input')?.focus();
                      }, 100);
                    }}
                    className="text-sm bg-[#054846]/10 hover:bg-[#054846]/20 text-[#054846] px-4 py-2 rounded-lg transition"
                  >
                    Quick Start: "Hi! I'd like to discuss a project"
                  </button>
                )}
              </div>
            ) : (
              chatMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs md:max-w-md rounded-xl p-4 ${
                      msg.sender === 'user' 
                        ? 'bg-[#054846] text-white rounded-br-none' 
                        : msg.sender === 'system'
                          ? 'bg-[#54c5c0]/10 text-[#054846] border border-[#54c5c0]/20'
                          : 'bg-white text-[#004643] rounded-bl-none shadow-sm border border-gray-200'
                    }`}
                  >
                    <p>{msg.content}</p>
                    <p className={`text-xs mt-2 ${
                      msg.sender === 'user' 
                        ? 'text-[#54c5c0]' 
                        : 'text-[#004643]/50'
                    }`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={chatEndRef} />
          </div>
          
          <div className="border-t border-[#054846]/10 p-4 bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={handleTyping}
                onKeyPress={handleKeyPress}
                placeholder={adminOnline ? "Type your message..." : "Leave a message..."}
                className="flex-1 px-4 py-3 border border-[#054846]/20 rounded-lg focus:ring-2 focus:ring-[#054846] focus:border-[#054846] outline-none transition chat-input"
                disabled={connectionStatus !== 'connected'}
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim() || connectionStatus !== 'connected'}
                className="bg-[#054846] text-white px-4 py-3 rounded-lg hover:bg-[#043c3a] transition disabled:opacity-50 flex-shrink-0"
                aria-label="Send message"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-[#004643]/50 mt-2">
              {adminOnline 
                ? "Our design team is online and ready to help"
                : connectionStatus === 'connected'
                  ? "We'll respond to your message as soon as possible"
                  : "Connecting to chat service..."}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}