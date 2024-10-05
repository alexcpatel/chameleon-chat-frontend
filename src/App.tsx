import React, { useState, useEffect, useCallback, useRef } from 'react';
import MessageWindow from './components/MessageWindow';
import MessageInput from './components/MessageInput';
import CharacterDropdown from './components/CharacterDropdown';
import { Message } from './interfaces/MessageInterface';
import { Character } from './interfaces/CharacterInterface';

const API_URL = process.env.REACT_APP_API_URL;
const WS_URL = process.env.REACT_APP_WS_URL;

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<string>('');
  const socketRef = useRef<WebSocket | null>(null);

  // Fetch characters
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(`${API_URL}/characters`);
        if (!response.ok) {
          throw new Error('Failed to fetch characters');
        }
        const data = await response.json();
        const charactersWithIds = data.map((character: { name: string, description: string }) => ({
          ...character,
          id: character.name,
        }));
        setCharacters(charactersWithIds);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

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
        const ws = new WebSocket(`${WS_URL}/chat`);
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

  const handleSendMessage = (message: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.send(JSON.stringify({
        text: message,
        character: selectedCharacter,
      }));
    }
  };

  return (
    <div style={{ height: '100vh', backgroundColor: '#f0f0f0' }}>
      {isConnected ? (
        <>
          <CharacterDropdown
            characters={characters}
            selectedCharacter={selectedCharacter}
            onSelectCharacter={setSelectedCharacter}
          />
          <MessageWindow messages={messages}>
            <MessageInput onSendMessage={handleSendMessage} />
          </MessageWindow>
        </>
      ) : (
        <div>Connecting to server...</div>
      )}
    </div>
  );
};

export default App;
