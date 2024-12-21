declare global {
  interface Film {
    id: number | null;
    name: string;
    genres: string[] | [];
    genreIds: number[] | [];
    releaseYear: number | null;
    actorIds: number[]|[];
    directorId: number|null;
    directorName: string|null;
    preview: string|null;
    gallery: string[]|[];
    actorNames: string[]|[];
    description: string;
    rating: number;
    age: number;
    duration: string|number|Date|null;
    producerId: number|null;
    producerName: string | null;
    writerId: number|null;
    writerName: string|null;
    assessments: number;
  }
  
  interface FilmListResponse {
    items: Film[];
    total: number;
  }
}
export {};