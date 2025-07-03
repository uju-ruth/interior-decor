import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { FiSend, FiPaperclip, FiSmile } from 'react-icons/fi';
import { BsCheck2All, BsThreeDotsVertical } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';
import Cookies from 'js-cookie';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:9000';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000';

const ChatPage = () => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [userInfo, setUserInfo] = useState(() => {
    const savedName = Cookies.get('chatUserName');
    const savedEmail = Cookies.get('chatUserEmail');
    return {
      name: savedName || '',
      email: savedEmail || ''
    };
  });
  const [showUserForm, setShowUserForm] = useState(!Cookies.get('chatSessionId'));
  const messagesEndRef = useRef(null);

  // Initialize socket connection and restore session
  useEffect(() => {
    const sessionId = Cookies.get('chatSessionId');
    if (!sessionId) return;

    const newSocket = io(SOCKET_URL, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      query: {
        sessionId,
        userName: userInfo.name
      }
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      setConnected(true);
      if (sessionId) {
        newSocket.emit('restore_session', { 
          sessionId,
          userName: userInfo.name 
        });
      }
    });

    newSocket.on('session_restored', (data) => {
      setMessages(data.messages || []);
      scrollToBottom();
    });

    newSocket.on('new-message', (message) => {
      setMessages(prev => [...prev, message]);
      scrollToBottom();
    });

    newSocket.on('typing', (typingStatus) => {
      setIsTyping(typingStatus);
    });

    newSocket.on('message_read', ({ messageId }) => {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, status: 'read' } : msg
      ));
    });

    newSocket.on('connect_error', (err) => {
      console.error('Connection error:', err);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() && attachments.length === 0) return;

    let uploadedAttachments = [];
    if (attachments.length > 0) {
      try {
        const formData = new FormData();
        attachments.forEach(file => {
          formData.append('files', file);
        });

        const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: progressEvent => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          }
        });

        uploadedAttachments = response.data.map(file => ({
          url: `${API_BASE_URL}/uploads/${file.filename}`,
          name: file.originalname,
          type: file.mimetype.split('/')[0]
        }));
      } catch (error) {
        console.error('Upload failed:', error);
        return;
      }
    }

    const messageObj = {
      id: Date.now().toString(),
      content: newMessage,
      type: 'text',
      sender: 'user',
      timestamp: new Date(),
      status: 'sent',
      attachments: uploadedAttachments,
      sessionId: Cookies.get('chatSessionId')
    };

    setMessages(prev => [...prev, messageObj]);
    setNewMessage('');
    setAttachments([]);
    setUploadProgress(0);
    scrollToBottom();

    socket.emit('send_message', messageObj);

    if (uploadedAttachments.length > 0) {
      uploadedAttachments.forEach(attachment => {
        const attachmentMsg = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          content: attachment.url,
          type: attachment.type,
          sender: 'user',
          timestamp: new Date(),
          status: 'sent',
          attachment,
          sessionId: Cookies.get('chatSessionId')
        };
        
        setMessages(prev => [...prev, attachmentMsg]);
        socket.emit('send_message', attachmentMsg);
      });
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      return validTypes.includes(file.type);
    });
    
    if (validFiles.length !== files.length) {
      alert('Only images (JPEG, PNG, GIF) and PDFs are allowed');
    }
    
    setAttachments(validFiles);
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    socket.emit('typing', {
      userId: socket.id,
      isTyping: e.target.value.length > 0
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiSelect = (emoji) => {
    setNewMessage(prev => prev + emoji.emoji);
    setShowEmojiPicker(false);
  };

  const registerUser = (e) => {
    e.preventDefault();
    if (!userInfo.name.trim()) {
      alert('Please enter your name');
      return;
    }
    
    const sessionId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    Cookies.set('chatSessionId', sessionId, { expires: 7 });
    Cookies.set('chatUserName', userInfo.name, { expires: 7 });
    if (userInfo.email) {
      Cookies.set('chatUserEmail', userInfo.email, { expires: 7 });
    }

    const newSocket = io(SOCKET_URL, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      query: {
        sessionId,
        userName: userInfo.name
      }
    });

    setSocket(newSocket);
    setShowUserForm(false);

    newSocket.on('connect', () => {
      newSocket.emit('register_user', {
        ...userInfo,
        sessionId
      });
    });
  };

  const renderMessage = (message) => {
    switch (message.type) {
      case 'image':
        return (
          <div className="max-w-xs md:max-w-md">
            <img 
              src={message.content} 
              alt={message.attachment?.name || 'Image'} 
              className="rounded-lg max-h-64 object-cover"
              onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Available'}
            />
          </div>
        );
      case 'video':
        return (
          <div className="max-w-xs md:max-w-md">
            <video controls className="rounded-lg max-h-64">
              <source src={message.content} type={message.attachment?.type} />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      case 'file':
        return (
          <a 
            href={message.content} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-indigo-100 text-indigo-800 p-2 rounded-lg hover:bg-indigo-200 transition-colors"
          >
            📄 {message.attachment?.name || 'File'}
          </a>
        );
      default:
        return <p className="whitespace-pre-wrap break-words">{message.content}</p>;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {showUserForm ? (
        <div className="flex items-center justify-center h-full">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Welcome to Live Chat</h2>
            <form onSubmit={registerUser}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Your Name*</label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                  maxLength={50}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email (optional)</label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  maxLength={100}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
              >
                Start Chatting
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className={`h-3 w-3 rounded-full ${connected ? 'bg-green-400' : 'bg-gray-400'}`}></div>
              <h2 className="text-lg font-semibold">Live Support</h2>
              <span className="text-sm bg-white/20 px-2 py-1 rounded-full">{userInfo.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className="p-1 rounded-full hover:bg-indigo-500 transition-colors"
                onClick={() => {
                  Cookies.remove('chatSessionId');
                  window.location.reload();
                }}
              >
                <BsThreeDotsVertical size={18} />
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p>Our support team will respond shortly. Please describe your issue.</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 ${message.sender === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none shadow'}`}
                  >
                    {renderMessage(message)}
                    <div className="flex justify-end items-center mt-1 space-x-1">
                      <span className="text-xs opacity-80">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {message.sender === 'user' && (
                        <BsCheck2All
                          size={14}
                          className={message.status === 'read' ? 'text-blue-300' : 'text-gray-300'}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-lg rounded-bl-none p-3 shadow">
                  <div className="flex space-x-1 items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    <span className="ml-2 text-sm">Admin is typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - This was missing in your original code */}
          <div className="bg-white border-t p-3">
            {attachments.length > 0 && (
              <div className="flex items-center space-x-2 mb-2 overflow-x-auto pb-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center bg-gray-100 rounded px-2 py-1 text-sm flex-shrink-0">
                    <span className="truncate max-w-[120px]">{file.name}</span>
                    <button
                      onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}

            <div className="flex items-end space-x-2">
              <div className="flex space-x-1">
                <label className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors">
                  <FiPaperclip size={20} className="text-gray-500" />
                  <input 
                    type="file" 
                    multiple 
                    className="hidden" 
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                  />
                </label>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <FiSmile size={20} className="text-gray-500" />
                </button>
              </div>
              <div className="relative flex-1">
                <textarea
                  value={newMessage}
                  onChange={handleTyping}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="w-full border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none max-h-32"
                  rows="1"
                  maxLength={1000}
                />
                {showEmojiPicker && (
                  <div className="absolute bottom-12 left-0 z-10">
                    <EmojiPicker 
                      onEmojiClick={handleEmojiSelect}
                      width={300}
                      height={400}
                      searchDisabled={false}
                    />
                  </div>
                )}
              </div>
              <button
                onClick={handleSendMessage}
                disabled={(!newMessage.trim() && attachments.length === 0) || !connected}
                className={`p-2 rounded-full transition-colors ${(newMessage.trim() || attachments.length > 0) && connected ? 
                  'bg-indigo-600 text-white hover:bg-indigo-700' : 
                  'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
              >
                <IoMdSend size={20} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatPage;