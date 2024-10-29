export interface User {
  id: number;
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean; // Add the isAdmin property
}

export interface RegisterUser {
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}