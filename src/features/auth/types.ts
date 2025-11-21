export interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  hydrated: boolean; // whether persisted token has been loaded
}
