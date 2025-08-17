import { Favourite } from "./Snippet";
export interface AuthUser {
  uid: string;
  username: string | null;
  email: string | null;
  password: string | null;
  avatar: string | null;
  favourites_id: Favourite[];
}