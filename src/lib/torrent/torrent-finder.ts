import { ItorrentExtended, rarbg } from 'rarbg-api-ts';

const sort = rarbg.enums.SORT.SEEDERS;

export interface SearchResult {
  name: string;
  magnet: string;
  imdb: string;
  themoviedb: string;
}

export const searchByImdbId = async (imdbId: string): Promise<SearchResult> => {
  const res = await rarbg.searchImdb(imdbId, {
    sort,
  });
  const json = res[0] as ItorrentExtended;
  if (json) {
    const {
      download: magnet,
      episode_info: { imdb, themoviedb },
    } = json;
    return {
      name: imdbId,
      magnet,
      imdb,
      themoviedb,
    };
  } else {
    throw new Error('torrent is not find');
  }
};
