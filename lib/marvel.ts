import axios from 'axios';
import md5 from 'md5';

const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY!;
const privateKey = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY!;
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';

const ts = new Date().getTime();
const hash = md5(ts + privateKey + publicKey);

const api = axios.create({
  baseURL: 'https://gateway.marvel.com:443/v1/public/',
  params: {
    ts,
    apikey: publicKey,
    hash,
  },
});

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

const fetchCharacters = async (): Promise<Character[]> => {
  try {
    const response = await api.get('/characters');
    return response.data.data.results.map((result: any) => ({
      id: result.id,
      name: result.name,
      description: result.description || 'No description available.',
      modified: result.modified,
      thumbnail: result.thumbnail,
      resourceURI: result.resourceURI,
      comics: result.comics || { available: 0, collectionURI: '', items: [] },
      series: result.series || { available: 0, collectionURI: '', items: [] },
      stories: result.stories || { available: 0, collectionURI: '', items: [] },
      events: result.events || { available: 0, collectionURI: '', items: [] },
      urls: result.urls || [],
    }));
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
};

const fetchCharacter = async (id: string): Promise<Character> => {
  try {
    const response = await api.get(`/characters/${id}`);
    const result = response.data.data.results[0];
    return {
      id: result.id,
      name: result.name,
      description: result.description || 'No description available.',
      modified: result.modified,
      thumbnail: result.thumbnail,
      resourceURI: result.resourceURI,
      comics: result.comics || { available: 0, collectionURI: '', items: [] },
      series: result.series || { available: 0, collectionURI: '', items: [] },
      stories: result.stories || { available: 0, collectionURI: '', items: [] },
      events: result.events || { available: 0, collectionURI: '', items: [] },
      urls: result.urls || [],
    };
  } catch (error) {
    console.error('Error fetching character:', error);
    throw error;
  }
};

// Adicionar a função fetchComic
const fetchComic = async (comicUrl: string): Promise<any> => {
  try {
    const response = await axios.get(comicUrl, {
      params: {
        ts,
        apikey: publicKey,
        hash,
      },
    });
    return response.data.data.results[0];
  } catch (error) {
    console.error('Error fetching comic:', error);
    throw error;
  }
};

export { fetchCharacters, fetchCharacter, fetchComic };
