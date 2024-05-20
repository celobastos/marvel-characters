import React from 'react';
import styles from '../../styles/ComicList.module.css';
import { Thumbnail, Comics } from '../../interfaces/CharacterInterfaces';

interface ComicListProps {
  comics: Comics;
  comicsThumbnails: { [key: string]: Thumbnail };
}

const ComicList: React.FC<ComicListProps> = ({ comics, comicsThumbnails }) => {
  return (
    <div className={styles.infoBox}>
      <img src="/assets/Comic Logo.svg" alt="Comics" className={styles.comicsLogo} />
      <ul className={styles.comicList}>
        {comics.items.map((item) => (
          <li key={item.resourceURI} className={styles.comicItem}>
            {comicsThumbnails[item.resourceURI] && (
              <img
                src={`${comicsThumbnails[item.resourceURI].path}.${comicsThumbnails[item.resourceURI].extension}`}
                alt={item.name}
                className={styles.comicThumbnail}
              />
            )}
            <p className={styles.comicName}>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComicList;
