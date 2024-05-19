// components/Characters/CharacterCard.tsx
import React from 'react';
import styles from '../../styles/Characters.module.css';
import { Character } from '../../interfaces/CharacterInterfaces';

interface CharacterCardProps {
  character: Character;
  handleCharacterClick: (id: number) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, handleCharacterClick }) => (
  <div
    key={character.id}
    className={styles.character}
    onClick={() => handleCharacterClick(character.id)}
    title={character.name}
  >
    <img
      src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
      alt={character.name}
      className={styles.characterImage}
    />
    <p className={styles.characterName}>{character.name}</p>
  </div>
);

export default CharacterCard;
