export enum FrameworkType {
  Angular = 'angular',
  React = 'react',
  Vue = 'vue',
  Svelte = 'svelte'
}


export interface framework {
  id: string;
  name: FrameworkType;
  logo?: string;
  description: string;
}