declare module '@splidejs/react-splide' {
  import type { ComponentType, ReactNode } from 'react';

  interface SplideOptions {
    gap?: string;
    perPage?: number;
    perMove?: number;
    [key: string]: unknown;
  }

  export const Splide: ComponentType<{
    options?: SplideOptions;
    children?: ReactNode;
  }>;
  export const SplideSlide: ComponentType<{ children?: ReactNode }>;
}
