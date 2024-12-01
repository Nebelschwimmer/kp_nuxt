import { clear } from "console";

export default {
  $vuetify: {
    input:{
      clear: "Clear"
    },
    rating: {
      ariaLabel:{
        item: "Rating"
      }
    }
  },
  welcome: "Welcome",
  nav: {
    title: "Navigation",
    home: "Home",
    films: "Films",
    actors: "Actors",
    directors: "Directors",
    language: "Language"
  },
  profile: {
    title: "Profile",
    name: "Name",
    email: "Email",
    password: "Password",
    save: "Save",
    logout: "Logout"
  },
  menu: {
    title: "Menu",
    toggle_theme: "Toggle Dark Mode",
    theme: {
      title: "Theme",
      light: "Light",
      dark: "Dark",
    },
    toggle_language: "Toggle Language",
    settings: "Settings",
  },
  actions: {
    title: "Actions",
    submit: "Submit",
    add: "Add",
    edit: "Edit",
    back: "Back",
    remove: "Remove",
    cancel: "Cancel",
    save: "Save",
    search: "Search",
    login: "Login",
    register: "Register",
    logout: "Logout",
    reset: "Reset",
    clear: "Clear",
    add_film: "Add Film",
    edit_film: "Edit Film",
    remove_film: "Remove Film",
    add_actor: "Add Actor",
    edit_actor: "Edit Actor",
    remove_actor: "Remove Actor",
    add_director: "Add Director",
    edit_director: "Edit Director",
    remove_director: "Remove Director",
    add_film_actor: "Add Film Actor",
    remove_film_actor: "Remove Film Actor",
  },
  state: {
    all: "All",
    active: "Active",
    inactive: "Inactive",
    loading: "Loading"
  },
  toast: {
    success: "Success",
    error: "Error",
    warning: "Warning",
    info: "Info",
    messages: {
      success: {
        add : "Successfully added",
        edit : "Successfully edited",
        remove: "Successfully removed",
      },
      error: {
        add : "Error adding",
        edit : "Error editing",
        remove: "Error removing",
        connection: "Connection error",
      },
      server_errors: {
        400: "Bad request",
        404: "Page not found",
        500: "Server error",
        503: "Service unavailable",
        403: "Forbidden",
        405: "Method not allowed",
        406: "Not acceptable",
        408: "Request timeout",
        409: "Conflict",
      }
    }
  },
  pages: {
    films: {
      title: "Films",
      back_to_list: "Back to films list",
      name: "Name",
      release_year: "Release Year",
      director: "Director",
      actors: "Actors",
      description: "Description",
      duration: "Duration",
      genre: "Genre",
      preview: "Preview",
      no_preview: "No Preview",
      gallery: "Gallery",
      add: "Add Film",
      edit: "Edit Film",
      remove: "Remove Film",
    },
  },
  forms: {
    rules: {
      max_chars: "Maximum characters",
      min_chars: "Minimum characters",
      min_year: "Minimum year",
      max_year: "Maximum year",
      type_num: "Type a number",
      required: "Required",
    },
    film: {
      add: "Add Film",
      edit: "Edit Film",
      name: "Name",
      release_year: "Release Year",
      director: "Director",
      actors: "Actors",
      description: "Description",
      duration: "Duration",
      genre: "Genre",
      preview: "Preview",
      gallery: "Gallery",
    },
  },
}