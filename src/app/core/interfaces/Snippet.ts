export interface Snippet {
  uid: string;
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

export interface UserSnippet {
  uid?: string;
  user_uid?: string;
  snippet_uid: string;
  created_at: Date;
}
