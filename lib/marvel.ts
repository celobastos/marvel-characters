// lib/marvel.ts
import axios from 'axios';
import md5 from 'md5';

const publicKey = process.env.MARVEL_PUBLIC_KEY!;
const privateKey = process.env.MARVEL_PRIVATE_KEY!;
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';

interface Thumbnail {
  path: string;
  extension: string;
}

interface Character {
  id: number;
  name: string;
  thumbnail: Thumbnail;
}

const fetchCharacters = async (): Promise<Character[]> => {
  const ts = new Date().getTime();
  const hash = md5(ts + privateKey + publicKey);
  
  const response = await axios.get(baseUrl, {
    params: {
      ts,
      apikey: publicKey,
      hash
    }
  });

  return response.data.data.results;
};

export default fetchCharacters;
