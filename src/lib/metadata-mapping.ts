export type OpenLibrarySearchItem = {
  title: string;
  description: string;
  author?: string;
  releaseYear?: string;
};

export type TmdbSearchItem = {
  title: string;
  description: string;
  releaseYear?: string;
};

export type BookFormData = {
  title: string;
  description?: string;
  author: string;
  releaseYear?: string;
  language?: string;
};

export type MovieFormData = {
  title: string;
  description?: string;
  director?: string;
  releaseYear?: string;
};

export function mapOpenLibraryToForm(
  item: OpenLibrarySearchItem,
): BookFormData {
  return {
    title: item.title ?? '',
    description: item.description?.trim() || undefined,
    author: item.author ?? '',
    releaseYear: item.releaseYear ?? undefined,
    language: undefined,
  };
}

export function mapTmdbToForm(item: TmdbSearchItem): MovieFormData {
  return {
    title: item.title ?? '',
    description: item.description?.trim() || undefined,
    director: undefined,
    releaseYear: item.releaseYear ?? undefined,
  };
}
