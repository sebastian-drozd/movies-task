type CreateMovieBase = {
  genres: string[];
  title: string;
  director: string;
  actors?: string;
  plot?: string;
  posterUrl?: string;
};

export type CreateMovieDTO = CreateMovieBase & {
  year: number;
  runtime: number;
};

export type CreateMovieDb = CreateMovieBase & {
  year: string;
  runtime: string;
};
