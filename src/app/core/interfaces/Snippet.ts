export interface Snippet {
  name: string;
  description: string;
  code: string;
}

export interface popularSnippet {
  icon: string;
  framework: string;
  code: string;
  action: string;
}

export interface Favourite {
  id: string;
  snippet_id: string;
  date_saved: Date;
  note: string;
}