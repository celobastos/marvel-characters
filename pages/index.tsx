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
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getCharacters = async () => {
      const data = await fetchCharacters();
      setCharacters(data);
      setFilteredCharacters(data);
    };

    getCharacters();
  }, []);

  const handleCharacterClick = (id: number) => {
    router.push(`/character/${id}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    if (searchValue) {
      const filtered = characters.filter(character =>
        character.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredCharacters(filtered);
    } else {
      setFilteredCharacters(characters);
    }
  };

  return (
    <div className="page-container">
      <h1>Marvel Characters</h1>
      <div className="search-bar">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search characters..."
        />
        {search && (
          <div className="dropdown">
            {filteredCharacters.map((character) => (
              <div
                key={character.id}
                className="dropdown-item"
                onClick={() => handleCharacterClick(character.id)}
                style={{ cursor: 'pointer' }}
              >
                {character.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="characters">
        {filteredCharacters.map((character) => (
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
        .search-bar {
          position: relative;
          margin-bottom: 20px;
          text-align: right;
        }
        .search-bar input {
          padding: 10px;
          font-size: 16px;
          width: 300px;
        }
        .dropdown {
          position: absolute;
          right: 0;
          background-color: white;
          border: 1px solid #ccc;
          width: 300px;
          max-height: 200px;
          overflow-y: auto;
          z-index: 1000;
        }
        .dropdown-item {
          padding: 10px;
          border-bottom: 1px solid #ccc;
        }
        .dropdown-item:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  );
};

export default Characters;
