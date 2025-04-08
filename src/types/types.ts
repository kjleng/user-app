export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export type NewUser = Omit<User, 'id' | 'createdAt'>;
