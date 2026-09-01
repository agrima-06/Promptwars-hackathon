import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import {
  ChatMessage,
  INITIAL_CONCIERGE_MESSAGES,
  generateConciergeResponse,
} from '../../utils/aiConciergeEngine';
import { createSpeechRecognizer } from '../../utils/speechUtils';
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Sparkles,
  Home,
  Users,
  Shield,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';

interface GenAIChatbotProps {
  onNavigateToSelfEnum?: () => void;
  onNavigateToTracker?: (stateCode?: string) => void;
}

export const GenAIChatbot: React.FC<GenAIChatbotProps> = ({
  onNavigateToSelfEnum,
  onNavigateToTracker,
}) => {
  const { currentLanguage, t } = useLanguage();
  const { readAloud, stopAudio, isAudioReading } = useAccessibility();

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    INITIAL_CONCIERGE_MESSAGES[currentLanguage] || INITIAL_CONCIERGE_MESSAGES.en,
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterPhase, setFilterPhase] = useState<'All' | 'Phase 1' | 'Phase 2' | 'Privacy'>('All');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechRecognizerRef = useRef<any>(null);

  // Sync welcome message on language switch if only welcome message is present
  useEffect(() => {
    if (messages.length === 1 && messages[0].sender === 'ai') {
      setMessages([INITIAL_CONCIERGE_MESSAGES[currentLanguage] || INITIAL_CONCIERGE_MESSAGES.en]);
    }
  }, [currentLanguage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate realistic GenAI streaming delay
    setTimeout(() => {
      const aiResponse = generateConciergeResponse(query, currentLanguage);
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 450);
  };

  const handleVoiceInput = () => {
    if (isListening) {
      speechRecognizerRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognizer = createSpeechRecognizer(currentLanguage);
    speechRecognizerRef.current = recognizer;

    if (!recognizer.isSupported) {
      alert('Speech recognition is not supported in this browser. Please try Chrome/Edge or type your query.');
      return;
    }

    setIsListening(true);
    recognizer.start(
      (transcript) => {
        setIsListening(false);
        if (transcript) {
          setInputText(transcript);
          handleSendMessage(transcript);
        }
      },
      (err) => {
        console.error('Speech error', err);
        setIsListening(false);
      }
    );
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickPromptPills = [
    { label: '31 Questions in Phase 1', icon: Home, query: 'What are the 31 questions in Phase 1?' },
    { label: 'Generate SE ID', icon: Sparkles, query: 'How do I generate my Self-Enumeration ID (SE ID)?' },
    { label: 'Phase 2 & Caste Details', icon: Users, query: 'How will Caste and Demographics be collected in Phase 2?' },
    { label: 'Privacy & Tax Rumor', icon: Shield, query: 'Is census data shared with Income Tax authorities?' },
    { label: 'State Survey Dates', icon: HelpCircle, query: 'What is the schedule for Uttar Pradesh and Maharashtra?' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
      {/* Header Banner */}
      <div
        className="glass-card"
        style={{
          padding: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          background: 'linear-gradient(135deg, rgba(15, 44, 89, 0.95) 0%, rgba(7, 25, 49, 0.98) 100%)',
          color: '#ffffff',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff9933 0%, #e65100 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(255, 153, 51, 0.4)',
            }}
          >
            <Sparkles size={28} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', color: '#ffffff' }}>Samvaad 2027 • GenAI Concierge</h2>
              <span className="status-badge status-active" style={{ background: 'rgba(16, 185, 129, 0.25)', color: '#34d399' }}>
                <span className="live-dot" /> Online
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              Official Conversational Intelligence grounded in Census Act 1948 & ORGI Guidelines.
            </p>
          </div>
        </div>

        {/* Phase Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          <button
            className={`btn ${filterPhase === 'All' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
            onClick={() => setFilterPhase('All')}
          >
            All Topics
          </button>
          <button
            className={`btn ${filterPhase === 'Phase 1' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
            onClick={() => {
              setFilterPhase('Phase 1');
              handleSendMessage('Tell me all about Phase 1 Houselisting questions.');
            }}
          >
            <Home size={13} /> Phase 1 (Amenities)
          </button>
          <button
            className={`btn ${filterPhase === 'Phase 2' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
            onClick={() => {
              setFilterPhase('Phase 2');
              handleSendMessage('Tell me about Phase 2 Population & Caste enumeration.');
            }}
          >
            <Users size={13} /> Phase 2 (Demographics)
          </button>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="chat-container glass-card">
        {/* Messages Feed */}
        <div className="chat-messages">
          {messages.map((msg) => {
            const isAi = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                className={`chat-bubble ${isAi ? 'chat-bubble-ai' : 'chat-bubble-user'}`}
                style={{
                  alignSelf: isAi ? 'flex-start' : 'flex-end',
                }}
              >
                {/* AI Header */}
                {isAi && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.45rem',
                      fontSize: '0.78rem',
                      color: 'var(--saffron-500)',
                      fontWeight: 700,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Sparkles size={13} />
                      <span>Samvaad 2027 AI</span>
                      {msg.phaseContext && (
                        <span
                          style={{
                            fontSize: '0.7rem',
                            padding: '0.1rem 0.4rem',
                            background: 'rgba(56, 189, 248, 0.15)',
                            color: '#0284c7',
                            borderRadius: '4px',
                          }}
                        >
                          {msg.phaseContext}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <button
                        onClick={() => readAloud(msg.text)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          cursor: 'pointer',
                          padding: '2px',
                        }}
                        title="Read this answer aloud"
                      >
                        <Volume2 size={15} />
                      </button>

                      <button
                        onClick={() => handleCopyText(msg.id, msg.text)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: copiedId === msg.id ? '#10b981' : 'var(--text-muted)',
                          cursor: 'pointer',
                          padding: '2px',
                        }}
                        title="Copy response"
                      >
                        {copiedId === msg.id ? <Check size={15} /> : <Copy size={15} />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Formatted Markdown Content */}
                <div style={{ whiteSpace: 'pre-line', fontSize: '0.92rem' }}>{msg.text}</div>

                {/* Suggested Follow-up Pills */}
                {isAi && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                  <div
                    style={{
                      marginTop: '0.85rem',
                      paddingTop: '0.65rem',
                      borderTop: '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.35rem',
                    }}
                  >
                    {msg.suggestedQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(q)}
                        style={{
                          background: 'var(--bg-card)',
                          border: '1px solid var(--border-glow)',
                          color: 'var(--text-primary)',
                          borderRadius: 'var(--radius-full)',
                          padding: '0.25rem 0.65rem',
                          fontSize: '0.78rem',
                          cursor: 'pointer',
                          fontWeight: 500,
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--saffron-500)';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border-glow)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        💬 {q}
                      </button>
                    ))}
                  </div>
                )}

                {/* Message Timestamp */}
                <div
                  style={{
                    fontSize: '0.7rem',
                    color: isAi ? 'var(--text-muted)' : 'rgba(255, 255, 255, 0.7)',
                    marginTop: '0.35rem',
                    textAlign: 'right',
                  }}
                >
                  {msg.timestamp}
                </div>
              </div>
            );
          })}

          {/* Typing Animation */}
          {isTyping && (
            <div
              className="chat-bubble chat-bubble-ai"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }}
            >
              <Sparkles size={14} className="live-dot" />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Samvaad 2027 is thinking & citing legal rules...
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Starter Pills */}
        <div
          style={{
            padding: '0.65rem 1.25rem',
            background: 'var(--bg-tertiary)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            overflowX: 'auto',
          }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
            Quick Prompts:
          </span>
          {quickPromptPills.map((pill, idx) => {
            const PillIcon = pill.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSendMessage(pill.query)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                <PillIcon size={12} color="var(--saffron-500)" />
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>

        {/* Input Bar */}
        <div
          style={{
            padding: '0.85rem 1.25rem',
            background: 'var(--bg-card)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          {/* Voice Input Button */}
          <button
            className={`btn ${isListening ? 'mic-active' : 'btn-outline'}`}
            style={{
              padding: '0.65rem',
              borderRadius: '50%',
              width: '42px',
              height: '42px',
            }}
            onClick={handleVoiceInput}
            title={isListening ? 'Listening... Speak now' : 'Speak to AI (Voice-to-Text)'}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={
              isListening
                ? t('listening')
                : `${t('searchPlaceholder')} (${currentLanguage.toUpperCase()})`
            }
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: isListening ? '2px solid #f43f5e' : '1px solid var(--border-subtle)',
              background: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              outline: 'none',
            }}
          />

          {/* Send Button */}
          <button
            className="btn btn-primary"
            style={{
              padding: '0.65rem 1.25rem',
              borderRadius: 'var(--radius-md)',
            }}
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
          >
            <Send size={16} />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
