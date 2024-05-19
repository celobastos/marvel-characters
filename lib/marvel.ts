import axios from 'axios';
import md5 from 'md5';

const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY!;
const privateKey = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY!;
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';

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
  const ts = new Date().getTime();
  const hash = md5(ts + privateKey + publicKey);

  try {
    const response = await axios.get(baseUrl, {
      params: {
        ts,
        apikey: publicKey,
        hash,
      },
    });

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
  const ts = new Date().getTime();
  const hash = md5(ts + privateKey + publicKey);

  try {
    const response = await axios.get(`${baseUrl}/${id}`, {
      params: {
        ts,
        apikey: publicKey,
        hash,
      },
    });

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

export { fetchCharacters, fetchCharacter };
