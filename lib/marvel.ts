import axios from 'axios';
import md5 from 'md5';

const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY!;
const privateKey = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY!;
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';

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

const fetchCharacters = async (): Promise<Character[]> => {
  const ts = new Date().getTime();
  const hash = md5(ts + privateKey + publicKey);

  // Debug logging
  console.log('ts:', ts);
  console.log('publicKey:', publicKey);
  console.log('privateKey:', privateKey);
  console.log('hash:', hash);

  try {
    const response = await axios.get(baseUrl, {
      params: {
        ts,
        apikey: publicKey,
        hash,
      },
    });

    return response.data.data.results;
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
};

const fetchCharacter = async (id: string): Promise<Character> => {
  const ts = new Date().getTime();
  const hash = md5(ts + privateKey + publicKey);

  // Debug logging
  console.log('ts:', ts);
  console.log('publicKey:', publicKey);
  console.log('privateKey:', privateKey);
  console.log('hash:', hash);

  try {
    const response = await axios.get(`${baseUrl}/${id}`, {
      params: {
        ts,
        apikey: publicKey,
        hash,
      },
    });

    return response.data.data.results[0];
  } catch (error) {
    console.error('Error fetching character:', error);
    throw error;
  }
};

export { fetchCharacters, fetchCharacter };
