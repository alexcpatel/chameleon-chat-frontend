import React, { useState, KeyboardEvent } from 'react';
import { IoSend } from 'react-icons/io5';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        rows={1}
        style={{
          flex: 1,
          padding: '10px',
          paddingLeft: '20px',
          borderRadius: '20px',
          border: '1px solid #ccc',
          resize: 'none',
          fontSize: '16px',
          fontFamily: "'Roboto', sans-serif", // Updated to Roboto
        }}
      />
      <button
        type="submit"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          marginLeft: '10px',
          fontSize: '24px',
          color: '#007bff',
          transition: 'color 0.3s ease', // Add transition for smooth color change
          fontFamily: "'Roboto', sans-serif", // Updated to Roboto
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#0056b3'} // Darker blue on hover
        onMouseLeave={(e) => e.currentTarget.style.color = '#007bff'} // Return to original color
      >
        <IoSend />
      </button>
    </form>
  );
};

export default MessageInput;
