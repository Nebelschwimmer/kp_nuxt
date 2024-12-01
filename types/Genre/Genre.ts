declare global {
  interface Genre{
    id: Number,
    name: String
  }
  
  interface GenreListItem {
		id: Number;
		name: String;
  }
  interface GenreListResponse {
    items: GenreListItem[]
  }
}
export {};