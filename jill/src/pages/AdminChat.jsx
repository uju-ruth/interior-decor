import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import {
  FiSend,
  FiUsers,
  FiArchive,
  FiSearch,
  FiMessageSquare,
  FiFileText,
  FiDownload,
  FiTrash2,
} from "react-icons/fi";
import { BsCheck2All, BsThreeDotsVertical } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:9000";
const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET || "admin123";

const AdminChatPage = () => {
  const [socket, setSocket] = useState(null);
  const [activeConversation, setActiveConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [stats, setStats] = useState({
    totalConversations: 0,
    activeConversations: 0,
    resolvedToday: 0,
  });
  const [unreadCounts, setUnreadCounts] = useState({});
  const messagesEndRef = useRef(null);


  // Always use the latest activeConversation in event handlers
  const activeConversationRef = useRef(activeConversation);
  useEffect(() => { activeConversationRef.current = activeConversation; }, [activeConversation]);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(SOCKET_URL + "/admin", {
      auth: { token: import.meta.env.VITE_ADMIN_SECRET },
    });

    // Listen for admin's own messages broadcast from backend
    newSocket.on("new-admin-message", ({ sessionId, message }) => {
      if (activeConversation === sessionId) {
        setMessages((prev) => [...prev, message]);
        scrollToBottom();
      }
      // Optionally update last message in sidebar
      setConversations((prev) =>
        prev.map((c) =>
          c.sessionId === sessionId
            ? { ...c, lastMessage: message.content, createdAt: message.timestamp }
            : c
        )
      );
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Admin connected to Socket.IO");
      // Request initial data
      newSocket.emit("request_initial_data");
    });

    newSocket.on("initial_data", (data) => {
      setConversations(data.conversations);
      setStats(data.stats);
      setOnlineUsers(data.onlineUsers);
    });

    newSocket.on("new_conversation", (conversation) => {
      setConversations((prev) => {
        const exists = prev.some((c) => c.sessionId === conversation.sessionId);
        return exists ? prev : [...prev, conversation];
      });
      updateUnreadCount(conversation.sessionId, 1);
    });

    newSocket.on("new-user-message", ({ sessionId, message }) => {
      console.log("[Admin] Received new-user-message", { sessionId, message });
      setConversations((prev) => {
        const exists = prev.some((c) => c.sessionId === sessionId);
        if (!exists) {
          // Add new conversation to the sidebar
          // Optionally auto-select if none selected
          if (!activeConversationRef.current) {
            setActiveConversation(sessionId);
          }
          return [
            ...prev,
            {
              sessionId,
              userName: message.sender === "user" ? "User" : "Admin",
              lastMessage: message.content,
              createdAt: message.timestamp,
            },
          ];
        }
        // Update lastMessage and createdAt for existing conversation
        return prev.map((c) =>
          c.sessionId === sessionId
            ? {
                ...c,
                lastMessage: message.content,
                createdAt: message.timestamp,
              }
            : c
        );
      });

      if (activeConversationRef.current === sessionId) {
        setMessages((prev) => [...prev, message]);
        scrollToBottom();
        socket?.emit("mark_messages_read", { sessionId });
      } else {
        updateUnreadCount(sessionId, 1);
      }
    });

    newSocket.on("message_history", ({ sessionId, messages }) => {
      if (activeConversation === sessionId) {
        setMessages(messages);
        scrollToBottom();
      }
    });

    newSocket.on("typing", ({ sessionId, isTyping }) => {
      if (activeConversation === sessionId) {
        setIsTyping(isTyping);
      }
    });

    newSocket.on("user_disconnected", (sessionId) => {
      setConversations((prev) =>
        prev.filter((conv) => conv.sessionId !== sessionId)
      );
      if (activeConversation === sessionId) {
        setActiveConversation(null);
        setMessages([]);
      }
    });

    newSocket.on("connection_stats", ({ onlineUsers, ...stats }) => {
      setOnlineUsers(onlineUsers);
      setStats(stats);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Load messages when active conversation changes
  useEffect(() => {
    if (socket && activeConversation) {
      socket.emit("get_message_history", { sessionId: activeConversation });
      // Clear unread count when opening conversation
      setUnreadCounts((prev) => ({ ...prev, [activeConversation]: 0 }));
    }
  }, [activeConversation, socket]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const updateUnreadCount = (sessionId, count) => {
    setUnreadCounts((prev) => ({
      ...prev,
      [sessionId]: (prev[sessionId] || 0) + count,
    }));
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;

    // Only emit the event, let backend broadcast and update messages
    socket.emit("send-admin-message", {
      sessionId: activeConversation,
      content: newMessage,
    });
    setNewMessage("");
    // Optionally, you can optimistically add the message to UI here if you want instant feedback
    // setMessages((prev) => [...prev, { ...message, sender: "admin" }]);
    scrollToBottom();
  };

  const resolveConversation = () => {
    if (activeConversation) {
      socket.emit("resolve_conversation", { sessionId: activeConversation });
      setConversations((prev) =>
        prev.filter((conv) => conv.sessionId !== activeConversation)
      );
      setActiveConversation(null);
      setMessages([]);
    }
  };

  const transferConversation = (targetAdminId) => {
    if (activeConversation) {
      socket.emit("transfer_conversation", {
        sessionId: activeConversation,
        targetAdminId,
      });
      // UI would update based on server response
    }
  };

  const exportChat = () => {
    const conversation = conversations.find(
      (c) => c.sessionId === activeConversation
    );
    const chatData = {
      sessionId: activeConversation,
      userName: conversation?.userName || "Unknown User",
      messages,
      exportedAt: new Date(),
    };

    const blob = new Blob([JSON.stringify(chatData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat_${activeConversation}_${new Date().toISOString()}.json`;
    a.click();
  };

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.sessionId.includes(searchTerm) ||
      conv.userName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Online: {onlineUsers}</span>
            <span>Active: {stats.activeConversations}</span>
          </div>
        </div>

        <div className="p-3 border-b border-gray-200">
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              {searchTerm
                ? "No matching conversations"
                : "No active conversations"}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.sessionId}
                  className={`p-4 cursor-pointer hover:bg-gray-50 relative ${
                    activeConversation === conversation.sessionId
                      ? "bg-indigo-50"
                      : ""
                  }`}
                  onClick={() => setActiveConversation(conversation.sessionId)}
                >
                  {unreadCounts[conversation.sessionId] > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCounts[conversation.sessionId]}
                    </span>
                  )}
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">
                        {conversation.userName ||
                          `User ${conversation.sessionId.slice(0, 6)}`}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {conversation.lastMessage || "New conversation"}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(conversation.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-white rounded-lg shadow-xs">
              <div className="text-sm text-gray-500">Total</div>
              <div className="font-bold">{stats.totalConversations}</div>
            </div>
            <div className="p-2 bg-white rounded-lg shadow-xs">
              <div className="text-sm text-gray-500">Active</div>
              <div className="font-bold">{stats.activeConversations}</div>
            </div>
            <div className="p-2 bg-white rounded-lg shadow-xs">
              <div className="text-sm text-gray-500">Resolved</div>
              <div className="font-bold">{stats.resolvedToday}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
              <div>
                <h3 className="font-bold">
                  {conversations.find((c) => c.sessionId === activeConversation)
                    ?.userName || `User ${activeConversation.slice(0, 6)}`}
                </h3>
                <div className="flex items-center text-sm text-gray-500">
                  <span
                    className={`h-2 w-2 rounded-full mr-1 ${
                      isTyping ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></span>
                  {isTyping ? "Typing..." : "Online"}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={exportChat}
                  className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full"
                  title="Export chat"
                >
                  <FiDownload />
                </button>
                <button
                  onClick={() => transferConversation("another-admin-id")}
                  className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full"
                  title="Transfer conversation"
                >
                  <FiUsers />
                </button>
                <button
                  onClick={resolveConversation}
                  className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full"
                  title="Resolve conversation"
                >
                  <FiArchive />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No messages yet. Start the conversation.
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "admin"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                          message.sender === "admin"
                            ? "bg-indigo-600 text-white rounded-br-none"
                            : "bg-white text-gray-800 rounded-bl-none shadow"
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words">
                          {message.content}
                        </p>
                        <div className="flex justify-end items-center mt-1 space-x-1">
                          <span className="text-xs opacity-80">
                            {new Date(message.timestamp).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                          {message.sender === "admin" && (
                            <BsCheck2All
                              size={14}
                              className={
                                message.status === "read"
                                  ? "text-blue-300"
                                  : "text-gray-300"
                              }
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <textarea
                    value={newMessage}
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                      socket?.emit("typing", {
                        sessionId: activeConversation,
                        isTyping: e.target.value.length > 0,
                      });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type your message..."
                    className="w-full border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none max-h-32"
                    rows="1"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className={`p-2 rounded-full ${
                    newMessage.trim()
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <IoMdSend size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center p-6 max-w-md">
              <FiMessageSquare
                size={48}
                className="mx-auto text-gray-300 mb-4"
              />
              <h3 className="text-lg font-medium text-gray-900">
                No conversation selected
              </h3>
              <p className="mt-2 text-gray-500">
                Select a conversation from the sidebar or wait for new
                conversations to appear.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChatPage;









