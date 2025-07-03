import { useState, useEffect, useRef } from 'react';
import Navbar from '../component/navbar/navbar';
import Footer from '../component/footer/footer';
import { io } from 'socket.io-client';

// Contact images
const contactImage = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
const officeImage = "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [socket, setSocket] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [adminOnline, setAdminOnline] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const chatEndRef = useRef(null);

  // Initialize socket connection and session
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

    // Connection events
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

    // Chat events
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
      newSocket.off('connect');
      newSocket.off('disconnect');
      newSocket.off('connect_error');
      newSocket.off('new-message');
      newSocket.off('admin-typing');
      newSocket.off('admin-status');
      newSocket.disconnect();
    };
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch(`${BACKEND_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (!response.ok) throw new Error('Submission failed');
    
    setSubmitSuccess(true);
    setName('');
    setEmail('');
    setMessage('');
    
    // Auto-open live chat after successful submission
    setIsChatOpen(true);
    
    // Optional: Add a welcome message to the chat
    if (socket && connectionStatus === 'connected') {
      const welcomeMessage = {
        sender: 'system',
        content: `Hi ${name}! Thanks for contacting us. We've received your message and our team will assist you shortly.`,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, welcomeMessage]);
      
      // Scroll to bottom after a short delay to ensure chat is open
      setTimeout(scrollToBottom, 200);
    }
    
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Failed to submit form. Please try again.');
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
    <div className="w-full bg-white text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-[#054846] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={contactImage} 
            alt="Contact Us" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#054846] to-[#054846]/80" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question about our services, projects, or anything else, our team is ready to answer.
          </p>
        </div>
      </section>

      {/* Contact Sections */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <h2 className="text-3xl font-light text-[#054846] mb-8">Send Us a Message</h2>
          
          {submitSuccess ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">Thank You!</h3>
              <p className="text-emerald-700">
                Your message has been sent successfully. Our team will get back to you within 24 hours.
              </p>
              <button 
                onClick={() => setSubmitSuccess(false)}
                className="mt-4 text-emerald-700 underline hover:text-emerald-900"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#054846] focus:border-[#054846] outline-none transition"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#054846] focus:border-[#054846] outline-none transition"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
                <textarea
                  id="message"
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#054846] focus:border-[#054846] outline-none transition"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#054846] text-white px-6 py-4 rounded-lg font-medium hover:bg-[#043c3a] transition disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-light text-[#054846] mb-6">Contact Information</h2>
            <p className="text-gray-600 mb-8">
              Reach out to us through any of these channels. Our team is available to assist you with your interior design needs.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-[#054846]/10 p-3 rounded-full">
                <svg className="w-6 h-6 text-[#054846]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
                <p className="text-gray-600">Mon-Fri: 9am-6pm</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-[#054846]/10 p-3 rounded-full">
                <svg className="w-6 h-6 text-[#054846]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">info@interiordecor.com</p>
                <p className="text-gray-600">support@interiordecor.com</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-[#054846]/10 p-3 rounded-full">
                <svg className="w-6 h-6 text-[#054846]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Office</h3>
                <p className="text-gray-600">123 Design Avenue</p>
                <p className="text-gray-600">New York, NY 10001</p>
              </div>
            </div>
          </div>
          
          <div className="pt-8">
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
              <img 
                src={officeImage} 
                alt="Our Office" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className={`relative p-4 rounded-full shadow-xl transition-all transform hover:scale-105 ${
            adminOnline ? 'bg-[#054846]' : 'bg-gray-400'
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
            <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full"></span>
          )}
          {connectionStatus === 'connecting' && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-md h-[500px] bg-white rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-200 flex flex-col">
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
                  <span className="ml-2 text-xs font-normal">Online</span>
                ) : (
                  <span className="ml-2 text-xs font-normal">Offline</span>
                )}
                {connectionStatus === 'connecting' && (
                  <span className="ml-2 text-xs font-normal">Connecting...</span>
                )}
              </h3>
            </div>
            {isTyping && (
              <div className="text-xs italic">
                Admin is typing...
              </div>
            )}
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {chatMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p>Start a conversation with our team</p>
                {!adminOnline && (
                  <p className="text-sm mt-2 text-center">
                    {connectionStatus === 'connected' 
                      ? "Our team is currently offline. Leave a message and we'll get back to you soon."
                      : "Connecting to chat service..."}
                  </p>
                )}
              </div>
            ) : (
              chatMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                      msg.sender === 'user' 
                        ? 'bg-[#054846] text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p>{msg.content}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'user' ? 'text-emerald-200' : 'text-gray-500'
                    }`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={chatEndRef} />
          </div>
          
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={handleTyping}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#054846] focus:border-[#054846] outline-none transition"
                disabled={!adminOnline || connectionStatus !== 'connected'}
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim() || !adminOnline || connectionStatus !== 'connected'}
                className="bg-[#054846] text-white px-4 py-2 rounded-lg hover:bg-[#043c3a] transition disabled:opacity-50"
                aria-label="Send message"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {adminOnline 
                ? "Our team is online and ready to help"
                : connectionStatus === 'connected'
                  ? "Our team is currently offline. We'll respond as soon as possible"
                  : "Connecting to chat service..."}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}