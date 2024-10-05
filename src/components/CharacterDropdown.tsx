import React from 'react';
import { Character } from '../interfaces/CharacterInterface';

interface CharacterDropdownProps {
    characters: Character[];
    selectedCharacter: string;
    onSelectCharacter: (character: string) => void;
  }

const CharacterDropdown: React.FC<CharacterDropdownProps> = ({ characters, selectedCharacter, onSelectCharacter }) => {
  return (
    <select
      value={selectedCharacter}
      onChange={(e) => onSelectCharacter(e.target.value)}
      style={{ marginBottom: '10px' }}
    >
      <option value="">Select a character</option>
      {characters.map((character) => (
        <option key={character.id} value={character.id}>
          {character.name}
        </option>
      ))}
    </select>
  );
};

export default CharacterDropdown;
