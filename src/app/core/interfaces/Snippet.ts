export interface Snippet {
  title: string;
  icon: number;
  framework: string;
  code: string[];
  actions: string[];
}

export interface PopularSnippet {
  icon: string;
  framework: string;
  code: string[];
  actions: string[];
}

export interface Favourite {
  id: string;
  snippet_id: string;
  date_saved: Date;
  note: string;
}
