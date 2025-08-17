import { aboutItem } from "../core/interfaces/ItemAbout";
import { popularSnippet } from "../core/interfaces/Snippet";
import { framework } from "../core/interfaces/Framework";

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

// about section
export const aboutList: aboutItem[] = [
  {
    icon: '/check.svg',
    title: 'Código probado',
    description: 'Todos nuestros snippets son verificados y funcionan con las últimas versiones de cada framework.'
  },
  {
    icon: '/eye.svg',
    title: 'Claridad ante todo',
    description: 'Explicaciones concisas de cada snippet para que entiendas qué hace y cómo usarlo.'
  },
  {
    icon: '/thunderbolt.svg',
    title: 'Ahorra tiempo',
    description: 'Deja de buscar en múltiples fuentes. Tenemos lo que necesitas en un solo lugar.'
  }
]

// login
export const inputList: any[] = [
    {
      label: 'email',
      type: 'email',
      name: 'Email',
      placeholder: 'tu@email.com',
      value: '',
      validators: [
        { type: 'required', message: 'Email es requerido' },
        { type: 'email', message: 'Por favor ingresa un email válido' }
      ]
    },
    {
      label: 'username',
      type: 'text',
      name: 'Username',
      placeholder: 'Yourname',
      value: '',
      validators: [
        { type: 'required', message: 'El nombre de usuario es requerido' },
        { type: 'minlength', message: 'El nombre de usuario debe tener al menos 6 caracteres' }
      ]
    },
    {
      label: 'password',
      type: 'password',
      name: 'Password',
      placeholder: '******',
      value: '',
      validators: [
        { type: 'required', message: 'La contraseña es requerida' },
        { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres' }
      ]
    },
  ];