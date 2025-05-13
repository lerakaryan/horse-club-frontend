export interface Client {
  id?: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  username: string;
  password?: string;
  role?: string;
}
