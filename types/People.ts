declare global {
  interface Person {
    id: number | null;
    firstname: string;
    lastname: number;
    photo: string | null;
    gender: string;
    birthday: string | null;
    specialtyNames: string[];
    actedInFilms: number[];
  }
  interface PersonListItem {
		id: number;
		fullname: string;
    photo: string;
    specialtyNames: string[];
  }
  interface PersonListResponse {
    items: PersonListItem[]
  }
}
export {};