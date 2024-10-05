import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { Message } from '../interfaces/MessageInterface';

interface MessageWindowProps {
  messages: Message[];
  isLoading: boolean;
  children: React.ReactNode;
}

const MessageWindow: React.FC<MessageWindowProps> = ({ messages, isLoading, children }) => {
  // Sort messages by timestamp
  const sortedMessages = [...messages].sort((a, b) => a.timestamp - b.timestamp);

  return (
    <div style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      padding: '20px',
      boxSizing: 'border-box',
    }}>
      <div style={{ 
        flexGrow: 1, 
        overflowY: 'auto',
        marginBottom: '20px',
      }}>
        {sortedMessages.map((message) => (
          <div
            key={message.id}
            style={{
              display: 'flex',
              justifyContent: message.isUser ? 'flex-end' : 'flex-start',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            {!message.isUser && (
              <span style={{
                marginRight: '10px',
                fontSize: '0.8em',
                color: '#666',
                minWidth: '30px',
                textAlign: 'right',
              }}>
                {message.senderId}
              </span>
            )}
            <div
              style={{
                maxWidth: '70%',
                padding: '10px 15px',
                borderRadius: '18px',
                backgroundColor: message.isUser ? '#007bff' : '#e0e0e0',
                color: message.isUser ? 'white' : 'black',
              }}
            >
              {message.text}
            </div>
            {message.isUser && (
              <span style={{
                marginLeft: '10px',
                fontSize: '0.8em',
                color: '#666',
                minWidth: '30px',
                textAlign: 'left',
              }}>
                {message.senderId}
              </span>
            )}
          </div>
        ))}
        {isLoading && <LoadingSpinner />}
      </div>
      {children}
    </div>
  );
};

export default MessageWindow;
