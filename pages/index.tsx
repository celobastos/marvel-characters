import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { fetchCharacters } from '../lib/marvel';
import Header from '../components/Header';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const charactersPerPage = 20;
  const visiblePagesCount = 5;
  const router = useRouter();
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getCharacters = async () => {
      const data = await fetchCharacters(0, 100); // Fetch 100 characters
      setCharacters(data);
      setFilteredCharacters(data.slice(0, charactersPerPage));
      setTotalPages(Math.ceil(data.length / charactersPerPage));
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
      setFilteredCharacters(filtered.slice(0, charactersPerPage));
      setShowDropdown(true);
      setCurrentPage(1);
      setTotalPages(Math.ceil(filtered.length / charactersPerPage));
    } else {
      setFilteredCharacters(characters.slice(0, charactersPerPage));
      setShowDropdown(false);
      setCurrentPage(1);
      setTotalPages(Math.ceil(characters.length / charactersPerPage));
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * charactersPerPage;
    const endIndex = startIndex + charactersPerPage;
    setFilteredCharacters(characters.slice(startIndex, endIndex));
  };

  const getVisiblePages = () => {
    let start = Math.max(1, currentPage - Math.floor(visiblePagesCount / 2));
    let end = start + visiblePagesCount - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - visiblePagesCount + 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <Header
          search={search}
          setSearch={setSearch}
          handleSearchChange={handleSearchChange}
          showDropdown={showDropdown}
          filteredCharacters={filteredCharacters}
          handleCharacterClick={handleCharacterClick}
          setShowDropdown={setShowDropdown}
        />
        <div className="characters">
          {filteredCharacters.map((character) => (
            <div
              key={character.id}
              className="character"
              onClick={() => handleCharacterClick(character.id)}
              title={character.name}
            >
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                className="character-image"
              />
              <p>{character.name}</p>
            </div>
          ))}
        </div>
        <div className="pagination">
          {getVisiblePages().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? 'active' : ''}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
      <style jsx>{`
        .page-container {
          @apply bg-cover bg-center min-h-screen flex items-center justify-center overflow-hidden;
          background-image: url('/assets/backgroundSite.jpg');
        }
        .content-wrapper {
          @apply bg-black bg-opacity-80 p-8 rounded-lg overflow-y-auto;
          max-width: 75%;
          width: 100%;
          min-height: 110vh;
          height: auto;
          margin: 0 10%;
        }
        .header {
          @apply flex items-center justify-between mb-8;
        }
        .characters {
          @apply grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center;
        }
        .character {
          @apply m-4 cursor-pointer;
          width: 144px;
        }
        .character-image {
          @apply w-24 h-24 rounded-lg transition-transform duration-300 ease-in-out;
        }
        .character-image:hover {
          @apply transform scale-110;
        }
        .character p {
          @apply text-white text-center;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: block;
          padding-top: 7%;
        }
        .dropdown {
          @apply absolute right-0 bg-white border border-gray-300 w-80 max-h-52 overflow-y-auto z-50 rounded-lg;
          top: 100%;
          margin-top: 0.5rem;
        }
        .dropdown-item {
          @apply p-2 border-b border-gray-300 text-right;
        }
        .dropdown-item:hover {
          @apply bg-gray-200;
        }
        .pagination {
          @apply flex justify-center mt-8;
        }
        .pagination button {
          @apply mx-1 px-3 py-1 rounded border border-white text-white;
          color: white !important;
          border: 1px solid white !important;
          padding: 0px 10px 0px 10px !important;
          margin: 10px;
          border-radius: 20px !important;
        }
        .pagination button.active {
          @apply bg-blue-500 text-white;
          color: white !important;
          border: 1px solid white !important;
          border-radius: 8px !important;
        }
      `}</style>
    </div>
  );
};

export default Characters;
