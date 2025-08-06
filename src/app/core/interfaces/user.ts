export interface User {
  name: string;
  email: string;
  password: string;
  avatar: string;
  favourites: Favourite[];
}

export interface Favourite {
  id: string;
  snippet_id: string;
  date_saved: Date;
  note: string;
}

export interface Snippet {
  name: string;
  description: string;
  code: string;
}

export interface framework {
  id: string;
  name: string;
  logo?: string;
  description: string;
}
