import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchCharacter, fetchComic } from '../../lib/marvel';

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
  const [comicsThumbnails, setComicsThumbnails] = useState<{ [key: string]: Thumbnail }>({});

  useEffect(() => {
    if (id) {
      const getCharacter = async () => {
        const data = await fetchCharacter(id as string);
        setCharacter(data);

        // Fetch thumbnails for each comic
        const thumbnails: { [key: string]: Thumbnail } = {};
        for (const comic of data.comics.items) {
          const comicData = await fetchComic(comic.resourceURI);
          thumbnails[comic.resourceURI] = comicData.thumbnail;
        }
        setComicsThumbnails(thumbnails);
      };

      getCharacter();
    }
  }, [id]);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <button className="back-button" onClick={() => router.push('/')}>Back to Index</button>
        <div className="character-detail">
          <h1>{character.name}</h1>
          <div className="image-container">
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
            />
          </div>
          <p>{character.description}</p>
          <div className="info-container">
            <div className="info-box">
              <h2>Comics</h2>
              <p>Available: {character.comics.available}</p>
              <ul className="comic-list">
                {character.comics.items.map((item) => (
                  <li key={item.resourceURI} className="comic-item">
                    {comicsThumbnails[item.resourceURI] && (
                      <img
                        src={`${comicsThumbnails[item.resourceURI].path}.${comicsThumbnails[item.resourceURI].extension}`}
                        alt={item.name}
                        className="comic-thumbnail"
                      />
                    )}
                    <p className="comic-name">{item.name}</p>
                  </li>
                ))}
              </ul>
            </div> 
            <div className="info-box">
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
          </div>
        </div>
      </div>
      <style jsx>{`
        .page-container {
          @apply bg-cover bg-center min-h-screen flex items-center justify-center;
          background-image: url('/assets/backgroundSite.jpg'); /* Atualize o caminho conforme necessário */
        }
        .content-wrapper {
          @apply bg-black bg-opacity-80 p-8 rounded-lg; /* Adicionar bordas arredondadas e opacidade */
          max-width: 75%;
          width: 100%;
          min-height: 110vh;
          height: auto;
          margin: 0 10%;
          position: relative;
        }
        .character-detail {
          text-align: center;
        }
        .image-container {
          display: inline-block;
          text-align: left;
          margin-bottom: 20px;
        }
        img {
          width: 200px;
          height: 200px;
          border-radius: 8px; /* Adicionar bordas arredondadas */
        }
        .info-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          margin-top: 20px;
        }
        .info-box {
          @apply bg-gray-900 p-4 rounded-lg mb-4 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4;
          margin: 10px;
        }
        .info-box h2 {
          margin-bottom: 10px;
          color: #fff;
        }
        .info-box p, .info-box ul {
          color: #ccc;
        }
        .info-box ul {
          list-style-type: none;
          padding: 0;
        }
        .info-box ul li {
          margin-bottom: 5px;
        }
        .comic-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        .comic-item {
          margin: 10px;
          text-align: center;
        }
        .comic-thumbnail {
          width: 150px; /* Aumentar o tamanho das miniaturas */
          height: 225px;
          border-radius: 4px;
          margin-bottom: 5px;
        }
        .comic-name {
          width: 150px;
          word-wrap: break-word; /* Permitir quebras de linha */
          white-space: normal;
          color: #fff;
        }
        .back-button {
          position: absolute;
          top: 10px;
          left: 10px;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          border-radius: 8px; /* Adicionar bordas arredondadas */
          background-color: #fff;
          color: #000;
          border: none;
        }
        button {
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          border-radius: 8px; /* Adicionar bordas arredondadas */
        }
      `}</style>
    </div>
  );
};

export default CharacterDetail;
