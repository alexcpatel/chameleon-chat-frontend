import React, { useState } from 'react';
import styled from 'styled-components';
import { IoSend } from 'react-icons/io5';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  selectedCharacter: string;
}

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
`;

const StyledInput = styled.input`
  flex-grow: 1;
  padding: 10px 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 18px;
  margin-right: 10px;
`;

const SendButton = styled.button<{ disabled: boolean }>`
  width: 40px;
  height: 40px;
  background-color: ${props => props.disabled ? '#cccccc' : '#007bff'};
  color: white;
  border: none;
  border-radius: 50%;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    background-color: ${props => props.disabled ? '#cccccc' : '#0056b3'};
  }
`;

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, selectedCharacter }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && selectedCharacter) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputContainer>
        <StyledInput
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <SendButton type="submit" disabled={!selectedCharacter}>
          <IoSend size={20} />
        </SendButton>
      </InputContainer>
    </form>
  );
};

export default MessageInput;
