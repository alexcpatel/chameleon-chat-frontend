import React, { useState, useEffect, useCallback, useRef } from 'react';
import MessageWindow from './components/MessageWindow';
import { Message } from './interfaces/MessageInterface';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const socketRef = useRef<WebSocket | null>(null);

  // Handle incoming messages
  const handleMessage = useCallback((event: MessageEvent) => {
    const data = JSON.parse(event.data);
    setMessages((prevMessages) => [...prevMessages, {
      id: Date.now(),
      senderId: data.senderId,
      text: data.text,
      isUser: data.isUser,
      timestamp: Date.now(),
    }]);
  }, []);

  // Initialize WebSocket connection
  useEffect(() => {
    const connectWebSocket = () => {
      if (socketRef.current === null || socketRef.current.readyState === WebSocket.CLOSED) {
        const ws = new WebSocket('ws://localhost:8080/chat');
        socketRef.current = ws;

        ws.onopen = () => {
          console.log('WebSocket connected');
          setIsConnected(true);
        };

        ws.onclose = () => {
          console.log('WebSocket disconnected');
          setIsConnected(false);
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          setIsConnected(false);
        };

        ws.onmessage = handleMessage;
      }
    };

    connectWebSocket();

    return () => {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
    };
  }, [handleMessage]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() && socketRef.current && isConnected) {
      socketRef.current.send(JSON.stringify({ text: message }));
      setMessage('');
    }
  };

  return (
    <div style={{ height: '100vh', backgroundColor: '#f0f0f0' }}>
      {isConnected ? (
        <MessageWindow messages={messages}>
          <form onSubmit={handleSubmit}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={4}
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <button type="submit">Send</button>
          </form>
        </MessageWindow>
      ) : (
        <div>Connecting to server...</div>
      )}
    </div>
  );
};

export default App;
