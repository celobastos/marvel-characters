import React from 'react';
import styles from '../../styles/CharacterInfo.module.css';
import { Character } from '../../interfaces/CharacterInterfaces';

interface CharacterInfoProps {
  character: Character;
}

const CharacterInfo: React.FC<CharacterInfoProps> = ({ character }) => {
  return (
    <div className={styles.characterInfo}>
      <div className={styles.imageContainer}>
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
      </div>
      <div className={styles.descriptionContainer}>
        <h1 className={styles.characterName}>{character.name}</h1>
        <p className={styles.characterDescription}>{character.description}</p>
      </div>
    </div>
  );
};

export default CharacterInfo;
