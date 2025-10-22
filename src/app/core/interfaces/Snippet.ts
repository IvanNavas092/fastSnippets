import { framework } from "./Framework";


export interface Snippet {
  uid: string;
  title: string;
  icon: number;
  framework: framework;
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

export interface SnippetData {
  title: string;
  framework: string;
  code: string[];
  actions: string[];
}

export interface SnippetCode {
  code?: string;
  action?: string;
}