declare global {
  interface CurrentUser {
    id: number;
    firstname: string;
    lastname: string;
    age: number;
    email: string;
    role: string;
    avatar: string;
    favorites: number[];
    about: string;
  }
}
