import { popularSnippet } from "../core/interfaces/PopularSnippet";
import { framework } from "../core/interfaces/user";

export const frameworkList: framework[] = [
  {
    id: '1',
    name: 'Angular',
    logo: 'angular.svg',
    description: 'Componentes, servicios, directivas y más',
  },
  {
    id: '2',
    name: 'React',
    logo: 'react.svg',
    description: 'Hooks, componentes, contextos y más',
  },
  {
    id: '3',
    name: 'Vue.js',
    logo: 'vue.svg',
    description: 'Composition API, componentes, directivas',
  },
  {
    id: '4',
    name: 'Svelte',
    logo: 'svelte.svg',
    description: 'Componentes, directivas y más',
  },
];

export const popularSnippetList: popularSnippet[] = [
  {
    icon: 'angular.svg',
    framework: 'Angular',
    code: 'ng generate component nombre-componente --skip-tests --inline-style',
    action: 'Genera un componente Angular sin archivos de prueba, con template y estilos inline',
  },
  {
    icon: 'react.svg',
    framework: 'React',
    code: 'npx create-react-app my-app --template typescript',
    action: 'Crea una nueva aplicación React con TypeScript configurado',
  },
  {
    icon: 'vue.svg',
    framework: 'Vue.js',
    code: 'npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init',
    action: 'Instala Tailwind CSS con sus dependencias y genera el archivo de configuración',
  },
  {
    icon: 'svelte.svg',
    framework: 'Svelte',    
    code: 'npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init',
    action: 'Instala Tailwind CSS con sus dependencias y genera el archivo de configuración',
  }
];