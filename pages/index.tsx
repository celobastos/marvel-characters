import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchCharacters } from '../lib/marvel';

interface Thumbnail {
  path: string;
  extension: string;
}

interface Character {
  id: number;
  name: string;
  thumbnail: Thumbnail;
}

const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getCharacters = async () => {
      const data = await fetchCharacters();
      setCharacters(data);
    };

    getCharacters();
  }, []);

  const handleCharacterClick = (id: number) => {
    router.push(`/character/${id}`);
  };

  return (
    <div>
      <h1>Marvel Characters</h1>
      <div className="characters">
        {characters.map((character) => (
          <div
            key={character.id}
            className="character"
            onClick={() => handleCharacterClick(character.id)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
            />
            <p>{character.name}</p>
          </div>
        ))}
      </div>
      <style jsx>{`
        .characters {
          display: flex;
          flex-wrap: wrap;
        }
        .character {
          margin: 20px;
        }
        .character img {
          width: 100px;
          height: 100px;
        }
      `}</style>
    </div>
  );
};

export default Characters;
