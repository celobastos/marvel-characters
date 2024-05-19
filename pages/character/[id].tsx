import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchCharacter } from '../../lib/marvel';

interface Thumbnail {
  path: string;
  extension: string;
}

interface Url {
  type: string;
  url: string;
}

interface Comics {
  available: number;
  collectionURI: string;
  items: Array<{ resourceURI: string; name: string }>;
}

interface Series {
  available: number;
  collectionURI: string;
  items: Array<{ resourceURI: string; name: string }>;
}

interface Stories {
  available: number;
  collectionURI: string;
  items: Array<{ resourceURI: string; name: string }>;
}

interface Events {
  available: number;
  collectionURI: string;
  items: Array<{ resourceURI: string; name: string }>;
}

interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: Comics;
  series: Series;
  stories: Stories;
  events: Events;
  urls: Url[];
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
    <div className="character-detail">
      <h1>{character.name}</h1>
      <div className="image-container">
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
      </div>
      <p>{character.description}</p>
      <p><strong>Modified:</strong> {character.modified}</p>
      <p><strong>Resource URI:</strong> {character.resourceURI}</p>
      <div>
        <h2>Comics</h2>
        <p>Available: {character.comics.available}</p>
        <ul>
          {character.comics.items.map((item) => (
            <li key={item.resourceURI}>{item.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Series</h2>
        <p>Available: {character.series.available}</p>
        <ul>
          {character.series.items.map((item) => (
            <li key={item.resourceURI}>{item.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Stories</h2>
        <p>Available: {character.stories.available}</p>
        <ul>
          {character.stories.items.map((item) => (
            <li key={item.resourceURI}>{item.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Events</h2>
        <p>Available: {character.events.available}</p>
        <ul>
          {character.events.items.map((item) => (
            <li key={item.resourceURI}>{item.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Related Links</h2>
        <ul>
          {character.urls.map((url) => (
            <li key={url.type}>
              <a href={url.url} target="_blank" rel="noopener noreferrer">
                {url.type}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => router.push('/')}>Back to Index</button>
      <style jsx>{`
        .character-detail {
          text-align: center;
        }
        .image-container {
          display: inline-block;
          text-align: left;
        }
        img {
          width: 300px;
          height: 300px;
        }
        button {
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
        }
        ul {
          list-style-type: none;
          padding: 0;
        }
      `}</style>
    </div>
  );
};

export default CharacterDetail;
