declare global {
  interface CurrentUser {
    id: number;
    username: string;
    displayName: string;
    avatar: string;
    age: number;
    email: string;
    role: string;
    favorites: number[];
    about: string;
    assessments: Assessment[];
  }
  interface UserForm {
    id: number;
    username: string;
    password: string;
    displayName: string;
    email: string;
    age: number;
    role: string;
    avatar: string;
    about: string;
  }
}
