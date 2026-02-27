'use server';

import {
  mapOpenLibraryToForm,
  mapTmdbToForm,
  type BookFormData,
  type MovieFormData,
  type OpenLibrarySearchItem,
  type TmdbSearchItem,
} from '@/lib/metadata-mapping';

const tmdbAccessToken = process.env.TMDB_ACCESS_TOKEN;

export async function searchBookMetadata(
  query: string,
): Promise<BookFormData[]> {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://openlibrary.org/search.json?q=${encodedQuery}&limit=4`;
  const headers = new Headers({
    'User-Agent': 'MyAppName/1.0 (myemail@example.com)',
  });
  const options = {
    method: 'GET',
    headers: headers,
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();

  const searchResults: OpenLibrarySearchItem[] = [];
  for (const doc of data.docs) {
    searchResults.push({
      title: doc.title ?? '',
      description: '',
      author: doc.author_name?.[0],
      releaseYear: doc.first_publish_year?.toString(),
    });
  }

  const mappedResults = searchResults.map(mapOpenLibraryToForm);
  return mappedResults;
}

export async function searchMovieMetadata(
  query: string,
): Promise<MovieFormData[]> {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodedQuery}&page=1`;
  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tmdbAccessToken}`,
  });
  const options = {
    method: 'GET',
    headers: headers,
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();

  const searchResults: TmdbSearchItem[] = [];
  for (const movie of data.results) {
    searchResults.push({
      title: movie.title ?? '',
      description: movie.overview ?? '',
      releaseYear: movie.release_date?.slice(0, 4),
    });
  }

  const mappedResults = searchResults.map(mapTmdbToForm);
  return mappedResults;
}
