import axios from 'axios';
import md5 from 'md5';

const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY!;
const privateKey = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY!;
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

export { api };
