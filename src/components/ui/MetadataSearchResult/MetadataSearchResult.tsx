'use client';

import { BookFormData, MovieFormData } from '@/lib/metadata-mapping';

type MetadataSearchResultProps = {
  result: BookFormData | MovieFormData;
  handleSelectResult: (result: BookFormData | MovieFormData) => void;
};

import styles from './metadata-search-result.module.scss';
import Button from '../Button';

function MetadataSearchResult({
  result,
  handleSelectResult,
}: MetadataSearchResultProps) {
  return (
    <div className={styles.itemWrapper}>
      <div className={styles.itemDetails}>
        <h3>{result.title}</h3>
        {result.description && <p>{result.description}</p>}
        {result.releaseYear && <p>{result.releaseYear}</p>}
        {'author' in result && result.author && <p>{result.author}</p>}
        {'director' in result && result.director && <p>{result.director}</p>}
      </div>
      <Button type="button" onClick={() => handleSelectResult(result)}>
        Use this
      </Button>
    </div>
  );
}

export default MetadataSearchResult;
