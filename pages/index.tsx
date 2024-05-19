import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { fetchCharacters } from './../lib/marvel';
import Header from './../components/Header';
import CharacterCard from './../components/Characters/CharacterCard';
import Pagination from './../components/Characters/Pagination';
import Spinner from './../components/Spinner';
import { Character } from './../interfaces/CharacterInterfaces';
import styles from './../styles/Characters.module.css';

const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // Add loading state
  const charactersPerPage = 20;
  const router = useRouter();
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getCharacters = async () => {
      const data = await fetchCharacters(0, 100);
      setCharacters(data);
      setFilteredCharacters(data.slice(0, charactersPerPage));
      setTotalPages(Math.ceil(data.length / charactersPerPage));
      setLoading(false); // Set loading to false after data is fetched
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

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <Header
          search={search}
          setSearch={setSearch}
          handleSearchChange={handleSearchChange}
          showDropdown={showDropdown}
          filteredCharacters={filteredCharacters}
          handleCharacterClick={handleCharacterClick}
          setShowDropdown={setShowDropdown}
        />
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className={styles.characters}>
              {filteredCharacters.map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  handleCharacterClick={handleCharacterClick}
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Characters;