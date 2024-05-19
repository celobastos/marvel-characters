import { useEffect, useState, useRef } from 'react';
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
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getCharacters = async () => {
      const data = await fetchCharacters();
      setCharacters(data);
      setFilteredCharacters(data);
    };

    getCharacters();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
      setShowDropdown(true);
    } else {
      setFilteredCharacters(characters);
      setShowDropdown(false);
    }
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="text-white text-center text-2xl mb-4">Marvel Characters</h1>
        <div className="search-bar relative" ref={searchBarRef}>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search characters..."
            onFocus={() => setShowDropdown(true)}
          />
          {showDropdown && (
            <div className="dropdown">
              {filteredCharacters.map((character) => (
                <div
                  key={character.id}
                  className="dropdown-item"
                  onClick={() => handleCharacterClick(character.id)}
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
              title={character.name} // Adiciona um título para o tooltip
            >
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
              />
              <p>{character.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Characters;
