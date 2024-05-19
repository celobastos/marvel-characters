// components/Header/Header.tsx
import React, { useRef, useEffect } from 'react';
import styles from '../styles/Header.module.css';
import { HeaderProps } from './../interfaces/HeaderProps';

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
    <div className={styles.header}>
      <img src="/assets/Marvel Archive.svg" alt="Marvel Archive" className={styles.logo} />
      <div className={styles.searchBar} ref={searchBarRef}>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search characters..."
          onFocus={() => setShowDropdown(true)}
          className={styles.searchBarInput}
        />
        {showDropdown && (
          <div className={styles.dropdown}>
            {filteredCharacters.map((character) => (
              <div
                key={character.id}
                className={styles.dropdownItem}
                onClick={() => handleCharacterClick(character.id)}
              >
                {character.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
