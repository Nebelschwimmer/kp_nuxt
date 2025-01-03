declare global {
  interface Film {
    id: number | null;
    name: string;
    genres: string[] | [];
    genreIds: number[] | [];
    genreNames: string[] | [];
    releaseYear: number | null;
    actorIds: number[] | [];
    directorId: number | null;
    directorName: string | null;
    preview: string | null;
    gallery: string[] | [];
    actorNames: string[] | [];
    description: string;
    rating: number;
    age: number;
    duration: string | number | Date | null;
    producerId: number | null;
    producerName: string | null;
    writerId: number | null;
    writerName: string | null;
    composerId: number | null;
    composerName: string | null;
    assessments: number;
    slogan: string | null;
  }

  interface FilmForm {
    id: number | null;
    name: string;
    slogan: string | null;
    genreIds: number[] | [];
    releaseYear: number | null;
    actorIds: number[] | [];
    directorId: number | null;
    producerId: number | null;
    composerId: number | null;
    writerId: number | null;
    description: string;
    age: number;
    duration: string | number | Date | null;
    preview: string | null;
    gallery: string[] | [];
  }
}
export {};
