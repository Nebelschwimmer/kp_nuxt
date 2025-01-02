declare global {
  interface ResponseStatus {
    success: boolean;
    error: string;
    message: string;
  }
  interface FilmListResponse {
    items: Film[];
    totalPages: number;
    currentPage: number;
  }
  interface PersonListResponse {
    items: Person[];
    totalPages: number;
    currentPage: number;
  }
}
