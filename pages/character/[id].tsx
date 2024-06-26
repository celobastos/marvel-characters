import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchCharacter, fetchComic } from '../../lib/marvel';
import HeaderC from '../../components/CharacterDetail/HeaderCharacter';
import CharacterInfo from '../../components/CharacterDetail/CharacterInfo';
import ComicList from '../../components/CharacterDetail/ComicList';
import { Character, Thumbnail } from '../../interfaces/CharacterInterfaces';
import styles from '../../styles/CharacterDetail.module.css';
import Spinner from '../../components/Spinner';

const CharacterDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [character, setCharacter] = useState<Character | null>(null);
  const [comicsThumbnails, setComicsThumbnails] = useState<{ [key: string]: Thumbnail }>({});
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (id) {
      const getCharacter = async () => {
        try {
          const data = await fetchCharacter(id as string);
          setCharacter(data);

          const thumbnails: { [key: string]: Thumbnail } = {};
          for (const comic of data.comics.items) {
            const comicData = await fetchComic(comic.resourceURI.replace(/^http:\/\//i, 'https://'));
            thumbnails[comic.resourceURI] = comicData.thumbnail;
          }
          setComicsThumbnails(thumbnails);
          setLoading(false); 
        } catch (error) {
          console.error('Error fetching character:', error);
          setLoading(false);
        }
      };


      getCharacter();
    }
  }, [id]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <HeaderC />
        <div className={styles.characterDetail}>
          {loading ? (
            <Spinner />
          ) : (
            character && (
              <>
                <CharacterInfo character={character} />
                <div className={styles.infoContainer}>
                  <ComicList comics={character.comics} comicsThumbnails={comicsThumbnails} />
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;