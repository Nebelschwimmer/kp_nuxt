declare global {
  interface Person {
    id: number | null;
    firstname: string;
    lastname: string;
    photos: string[] | [];
    gender: string;
    genderId: number;
    birthday: string | null;
    specialtyNames: string[];
    specialtyIds: number[];
    actedInFilms: Partial<Film>[];
    producedFilms: Partial<Film>[];
    writtenFilms: Partial<Film>[];
    bio: string;
    age: number;
    cover: string | null;
    avatar: string | null;
  }

  interface PersonForm {
    id: number | null;
    firstname: string;
    lastname: string;
    photos: string[] | [];
    genderId: number;
    birthday: string | null;
    specialtyIds: number[];
    actedInFilms: Partial<Film>[];
    producedFilms: Partial<Film>[];
    writtenFilms: Partial<Film>[];
    bio: string;
    avatar: string | null;
    cover: string | null;
  }
  interface PersonListItem {
    id: number;
    fullname: string;
    photos: string[] | [];
    specialtyNames: string[];
  }

  interface Gender {
    name: string;
    value: string;
  }
}
export { };
