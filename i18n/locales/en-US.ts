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
    },
    stepper: {
      next: "Next",
      prev: "Previous"
    }
  },
  welcome: "Welcome",
  general: {
    total: "Total",
    items_per_page: "Items per page",
    ordering: "Ordering",
    search: "Search",
    page: "Page",
    sort: "Sort by",
    of: "of",
    first: "First",
    last: "Last",
    next: "Next",
    prev: "Previous",
    loading: "Loading",
    no_data: "No data",
    no_results: "No results",
    no_data_found: "No data found",
    no_results_found: "No results found",
  },
  nav: {
    title: "Navigation",
    home: "Home",
    films: "Films",
    people: "People",
    genres: "Genres",
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
    upload: "Upload",
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
    pick_file: "Pick a file",
    skip: "Skip"
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
    network_error: "Network error",
    films: {
      title: "Films",
      no_films: "No films added yet",
      back_to_list: "Back to films list",
      name: "Name",
      release_year: "Release Year",
      director: "Director",
      actors: "Actors",
      description: "Description",
      no_description: "No description",
      duration: "Duration",
      genre: "Genre",
      preview: "Preview",
      no_preview: "No Preview",
      gallery: "Gallery",
      no_gallery: "Gallery is empty",
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
      preview_max_size: "Preview size should be less than 2 MB!",
      preview_restrictions:"Allowed formats: jpg, png, jpeg. Maximum size - 2 MB.",
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
      genres: "Genres",
      genres_hint: "Pick genres",
      actors_hint: "Pick actors",
      director_hint: "Pick director",
      preview: "Preview",
      gallery: "Gallery",
      stepper: {
        first: "General Info",
        second: "Add actors",
        third: "Add director",
        required: 'Required',
        optional: 'Optional',
        error: 'Error',
      }
    },
  },
}