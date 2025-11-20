import React, { useState, useEffect, useRef } from 'react';
import { Chat } from '@google/genai';
import { createChatSession, sendMessageToChat } from '../services/geminiService';
import { ChatMessage, MessageRole } from '../types';
import { SendIcon, LeafIcon } from './Icons';
import MarkdownRenderer from './MarkdownRenderer';

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chat session on component mount
    const session = createChatSession();
    setChatSession(session);

    // Add initial welcome message
    setMessages([
      {
        id: 'init-1',
        role: MessageRole.MODEL,
        text: "Hello! I'm Verdia. Ask me anything about your garden, house plants, or landscaping ideas.",
        timestamp: new Date(),
      },
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || !chatSession || isLoading) return;

    const userMessageText = input.trim();
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      text: userMessageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToChat(chatSession, userMessageText);
      
      const modelMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: MessageRole.MODEL,
        text: responseText,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: MessageRole.MODEL,
        text: "I apologize, but I encountered a connection error. Please try asking again.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-emerald-100 overflow-hidden animate-fade-in">
      <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-500 p-2 rounded-full">
            <LeafIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Verdia Expert Chat</h2>
            <p className="text-emerald-100 text-xs">Powered by Gemini 3 Pro</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-5 py-3.5 ${
                msg.role === MessageRole.USER
                  ? 'bg-emerald-600 text-white rounded-br-none'
                  : 'bg-white border border-emerald-100 text-slate-800 rounded-bl-none shadow-sm'
              }`}
            >
              {msg.role === MessageRole.MODEL ? (
                <MarkdownRenderer content={msg.text} />
              ) : (
                <p>{msg.text}</p>
              )}
              <p className={`text-[10px] mt-1 text-right opacity-70 ${msg.role === MessageRole.USER ? 'text-emerald-100' : 'text-slate-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-emerald-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-emerald-100">
        <form onSubmit={handleSend} className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your plants..."
            className="w-full pl-4 pr-12 py-3 bg-slate-100 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 rounded-full transition-all outline-none text-slate-700 placeholder-slate-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 transition-all"
            aria-label="Send message"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatAssistant;