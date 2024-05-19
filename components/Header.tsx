import React, { useRef, useEffect } from 'react';

interface HeaderProps {
  search: string;
  setSearch: (value: string) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showDropdown: boolean;
  filteredCharacters: Array<{ id: number; name: string }>;
  handleCharacterClick: (id: number) => void;
  setShowDropdown: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  search,
  setSearch,
  handleSearchChange,
  showDropdown,
  filteredCharacters,
  handleCharacterClick,
  setShowDropdown,
}) => {
  const searchBarRef = useRef<HTMLDivElement>(null);

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
  }, [setShowDropdown]);

  return (
    <div className="header">
      <h1 className="text-white text-2xl">Marvel Characters</h1>
      <div className="search-bar relative" ref={searchBarRef}>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search characters..."
          onFocus={() => setShowDropdown(true)}
          className="p-2 text-lg w-80 rounded-lg pl-4 outline-none focus:border-none"
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
      <style jsx>{`
        .header {
          @apply flex items-center justify-between mb-16; /* Adiciona um flex container para alinhamento horizontal e aumenta o espaço inferior */
        }
        .search-bar input {
          @apply p-2 text-lg w-80 rounded-lg pl-4; /* Adicionar bordas arredondadas de 8px */
          outline: none; /* Remover a borda ao selecionar */
        }
        .search-bar input:focus {
          @apply border-none; /* Certificar-se de que a borda não aparece ao focar */
        }
        .dropdown {
          @apply absolute right-0 bg-white border border-gray-300 w-80 max-h-52 overflow-y-auto z-50 rounded-lg;
          top: 100%;
          margin-top: 0.5rem;
          scrollbar-width: thin; /* Firefox */
          scrollbar-color: #888 #fff; /* Firefox */
        }
        .dropdown-item {
          @apply p-2 border-b border-gray-300 text-left;
        }
        .dropdown-item:hover {
          @apply bg-gray-200;
        }
        /* Custom scrollbar for WebKit (Chrome, Safari) */
        .dropdown::-webkit-scrollbar {
          width: 8px;
        }
        .dropdown::-webkit-scrollbar-track {
          background: #fff;
        }
        .dropdown::-webkit-scrollbar-thumb {
          background-color: #888;
          border-radius: 10px;
          border: 2px solid #fff;
        }
      `}</style>
    </div>
  );
};

export default Header;
