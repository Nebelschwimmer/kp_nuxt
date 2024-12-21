declare global {
  interface Person {
    id: number | null;
    firstname: string;
    lastname: string;
    photo: string | null;
    gender: string;
    genderId: number;
    birthday: string | null;
    specialtyNames: string[];
    specialtyIds: number[];
    actedInFilms: number[];
    producedFilms: number[];
    writtenFilms: number[];
  }
  interface PersonListItem {
		id: number;
		fullname: string;
    photo: string;
    specialtyNames: string[];
  }
  interface PersonListResponse {
    items: Person[]
  }

  interface Gender {
    name: string;
    value: string;
  }
}
export {};