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
              title={character.name} // Adiciona um título para o tooltip
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
      </div>
      <style jsx>{`
        .page-container {
          @apply bg-cover bg-center min-h-screen flex items-center justify-center overflow-hidden;
          background-image: url('/assets/backgroundSite.jpg'); /* Atualize o caminho conforme necessário */
        }
        .content-wrapper {
          @apply bg-black bg-opacity-80 p-8 rounded-lg overflow-y-auto; /* Adicionar bordas arredondadas, opacidade e overflow-y */
          max-width: 75%;
          width: 100%;
          min-height: 110vh;
          height: auto;
          margin: 0 10%;
        }
        .header {
          @apply flex items-center justify-between mb-8; /* Aumentar o espaço inferior para 8 */
        }
        .characters {
          @apply grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center;
        }
        .character {
          @apply m-4 cursor-pointer;
          width: 144px; /* Ajuste para corresponder ao tamanho da imagem */
        }
        .character-image {
          @apply w-24 h-24 rounded-lg transition-transform duration-300 ease-in-out; /* Definir a imagem menor com 96px x 96px */
        }
        .character-image:hover {
          @apply transform scale-110; /* Aumentar ligeiramente o tamanho da imagem ao passar o mouse */
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
          @apply absolute right-0 bg-white border border-gray-300 w-80 max-h-52 overflow-y-auto z-50 rounded-lg; /* Adicionar bordas arredondadas de 8px */
          top: 100%; /* Posicionar diretamente abaixo da barra de pesquisa */
          margin-top: 0.5rem; /* Adicionar um pequeno espaço entre a barra de pesquisa e o dropdown */
        }
        .dropdown-item {
          @apply p-2 border-b border-gray-300 text-right; /* Alinhar o texto à direita */
        }
        .dropdown-item:hover {
          @apply bg-gray-200;
        }
      `}</style>
    </div>
  );
};

export default Characters;
