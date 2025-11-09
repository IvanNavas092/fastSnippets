export enum FrameworkType {
  Angular = 'Angular',
  React = 'React',
  Vue = 'Vue',
  Svelte = 'Svelte'
}


export interface framework {
  id?: string;
  name: FrameworkType;
  logo?: string;
  description?: string;
}