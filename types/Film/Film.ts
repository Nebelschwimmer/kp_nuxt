declare global {
  interface Film {
    id: Number|null,
    name: String,
    genreId: Number,
    genreName: String,
    releaseYear: Number|null,
    actorIDs: Number[]|[],
    directorId: Number|null,
    directorName: String|null,
    preview: String|null,
    gallery: String[]| [],
    actorNames: String[] | [],
    description: String,
    rating: Number,
  }
  interface Genre{
    id: Number,
    name: String
  }
  
  interface FilmListItem {
		id: Number;
		name: String;
		preview: String;
  }
  interface ListResponse {
    items: FilmListItem[]
  }
}
export {};