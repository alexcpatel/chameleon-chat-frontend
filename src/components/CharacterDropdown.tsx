import React from 'react';
import { Character } from '../interfaces/CharacterInterface';
import styled from 'styled-components';

interface CharacterDropdownProps {
    characters: Character[];
    selectedCharacter: string;
    onSelectCharacter: (character: string) => void;
  }

const DropdownContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

const DescriptionContainer = styled.div`
  flex: 1;
  margin-right: 10px;
  font-size: 14px;
  color: #333;
  text-align: right;
`;

const StyledSelect = styled.select`
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 18px;
  background-color: #e0e0e0;
  color: black;
  cursor: pointer;
  transition: all 0.3s ease;
  max-width: 70%;

  &:hover {
    background-color: #d0d0d0;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const CharacterDropdown: React.FC<CharacterDropdownProps> = ({ characters, selectedCharacter, onSelectCharacter }) => {
  const selectedCharacterObj = characters.find(char => char.id === selectedCharacter);

  return (
    <DropdownContainer>
      <DescriptionContainer>
        {selectedCharacterObj ? selectedCharacterObj.description : 'Select a character to see their description'}
      </DescriptionContainer>
      <StyledSelect
        value={selectedCharacter}
        onChange={(e) => onSelectCharacter(e.target.value)}
      >
        <option value="">Select a character</option>
        {characters.map((character) => (
          <option key={character.id} value={character.id}>
            {character.name}
          </option>
        ))}
      </StyledSelect>
    </DropdownContainer>
  );
};

export default CharacterDropdown;
