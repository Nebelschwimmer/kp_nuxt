declare global{
  interface CurrentUser {
    id: Number
    firstname: String
    lastname: String
    age: Number
    email: String
    role: String
    avatar: String
    favorites: Number[]
    about: String
  }
}