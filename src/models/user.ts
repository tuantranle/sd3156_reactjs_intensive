export interface User {
  userName: string;
  isAdmin: boolean; // Add the isAdmin property
  token: string;
}

export interface RegisterUser {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}