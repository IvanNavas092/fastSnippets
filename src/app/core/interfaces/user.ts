import { Favourite } from "./Snippet";
export interface AuthUser {
  uid: string;
  email: string | null;
  displayName : string | null;
  photoURL : string | null;
  phoneNumber : string | null;
  isAnonymous: boolean;
  creationTime: string | undefined;
}

// export interface AuthUser {
//   uid: string;
//   email: string | null;
//   displayName : string | null;
//   photoURL : string | null;
//   phoneNumber : string | null;
//   isAnonymous: boolean;
//   creationTime: number;
// }