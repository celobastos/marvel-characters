import React from 'react';
import { useRouter } from 'next/router';

const HeaderC: React.FC = () => {
  const router = useRouter();

  return (
    <header className="header">
      <h1 className="text-white text-2xl">Marvel Characters</h1>
      <button 
        className="back-button"
        onClick={() => router.push('/')}
      >
        Back to Index
      </button>
      <style jsx>{`
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          color: #fff;
        }
        .back-button {
          background-color: #fff;
          color: #000;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          border-radius: 8px; /* Adicionar bordas arredondadas */
        }
        .back-button:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </header>
  );
};

export default HeaderC;
