import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchCharacter } from '../../lib/marvel';

interface Thumbnail {
  path: string;
  extension: string;
}

interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: Thumbnail;
}

const CharacterDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    if (id) {
      const getCharacter = async () => {
        const data = await fetchCharacter(id as string);
        setCharacter(data);
      };

      getCharacter();
    }
  }, [id]);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{character.name}</h1>
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
      />
      <p>{character.description}</p>
    </div>
  );
};

export default CharacterDetail;
