export interface UsersType {
  id?: number;
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
  phone?: number;
  role?: number;
  avatar?: string;
  status?: number;
  createdAt?: string;
  updatedAt?: string;
}
export interface UsersTypeLogin {
  email?: string;
  password?: string;
}
