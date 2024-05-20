import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/HeaderCharacter.module.css';

  const HeaderC: React.FC = () => {
    const router = useRouter();
  
    return (
      <header className={styles.header}>
        <img src="/assets/Marvel Archive.svg" alt="Marvel Archives" className={styles.logo} />
        <button 
          className={styles.backButton}
          onClick={() => router.push('/')}
        >
          Back to Index
        </button>
      </header>
    );
  };
  
  export default HeaderC;
