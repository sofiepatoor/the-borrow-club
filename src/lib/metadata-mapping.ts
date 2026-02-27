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
  id?: string;
  title: string;
  description?: string;
  author: string;
  releaseYear?: string;
  language?: string;
};

export type MovieFormData = {
  id?: string;
  title: string;
  description?: string;
  director?: string;
  releaseYear?: string;
};

export function mapOpenLibraryToForm(
  item: OpenLibrarySearchItem,
): BookFormData {
  return {
    id: crypto.randomUUID(),
    title: item.title ?? '',
    description: item.description?.trim() || undefined,
    author: item.author ?? '',
    releaseYear: item.releaseYear ?? undefined,
    language: undefined,
  };
}

export function mapTmdbToForm(item: TmdbSearchItem): MovieFormData {
  return {
    id: crypto.randomUUID(),
    title: item.title ?? '',
    description: item.description?.trim() || undefined,
    director: undefined,
    releaseYear: item.releaseYear ?? undefined,
  };
}
