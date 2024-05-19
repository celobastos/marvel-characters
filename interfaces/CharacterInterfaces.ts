// interfaces/CharacterInterfaces.ts
export interface Thumbnail {
    path: string;
    extension: string;
  }
  
  export interface Url {
    type: string;
    url: string;
  }
  
  export interface Comics {
    available: number;
    collectionURI: string;
    items: Array<{ resourceURI: string; name: string }>;
  }
  
  export interface Series {
    available: number;
    collectionURI: string;
    items: Array<{ resourceURI: string; name: string }>;
  }
  
  export interface Stories {
    available: number;
    collectionURI: string;
    items: Array<{ resourceURI: string; name: string }>;
  }
  
  export interface Events {
    available: number;
    collectionURI: string;
    items: Array<{ resourceURI: string; name: string }>;
  }
  
  export interface Character {
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
  